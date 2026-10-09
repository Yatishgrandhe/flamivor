import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {ConvexHttpClient} from 'convex/browser';
import {api} from '../convex/_generated/api.js';
const env=fs.readFileSync('.env.local','utf8');
const key=env.match(/^CLERK_SECRET_KEY=["']?([^\n"']+)/m)?.[1];
if(!key?.startsWith('sk_test_'))throw Error('This check only creates isolated users in a Clerk development instance.');
const base=env.match(/^NEXT_PUBLIC_CONVEX_URL=(.+)$/m)[1];
async function clerk(path,body,method=body?'POST':'GET'){const response=await fetch('https://api.clerk.com/v1'+path,{method,headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const result=await response.json();if(!response.ok)throw Error(JSON.stringify(result));return result;}
const users=[];const clients=[];
try {
 for(let i=0;i<2;i++){const user=await clerk('/users',{email_address:[`flamivor-qa-${Date.now()}-${i}+clerk_test@example.com`],skip_password_requirement:true,first_name:'Isolated',last_name:'QA'});users.push(user.id);const session=await clerk('/sessions',{user_id:user.id});const {jwt}=await clerk(`/sessions/${session.id}/tokens/convex`,{});const client=new ConvexHttpClient(base);client.setAuth(jwt);clients.push(client);}
 const [a,b]=clients;
 await a.mutation(api.members.saveProfile,{name:'Isolated QA',role:'volunteer',interests:'Temporary persistence verification'});
 await a.mutation(api.members.setBookmark,{slug:'paper-bridge',saved:true});await a.mutation(api.members.setBookmark,{slug:'paper-bridge',saved:true});
 const first=await a.query(api.members.get,{});assert.equal(first.profile.role,'volunteer');assert.deepEqual(first.bookmarks,['paper-bridge']);
 const second=await b.query(api.members.get,{});assert.equal(second.profile,null);assert.deepEqual(second.bookmarks,[]);
 await assert.rejects(new ConvexHttpClient(base).query(api.members.get,{}));
 await assert.rejects(a.mutation(api.members.setBookmark,{slug:'not-a-guide',saved:true}));
 await assert.rejects(a.mutation(api.members.saveProfile,{name:'A',role:'learner',interests:''}));
 await a.mutation(api.members.clearMyData,{});assert.deepEqual(await a.query(api.members.get,{}),{profile:null,bookmarks:[]});
 console.log('PASS: persistence, idempotent saves, user isolation, signed-out rejection, input validation, and clear-data behavior.');
} finally {
 for(const client of clients)await client.mutation(api.members.clearMyData,{}).catch(()=>{});
 for(const id of users)await clerk('/users/'+id,undefined,'DELETE');
 console.log('Temporary test users and data removed.');
}
