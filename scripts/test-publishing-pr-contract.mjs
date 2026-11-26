// Exercise the shared CLI against real WebP fixture bytes, never a site post.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const shared = path.resolve(process.argv[2]);
const { imageFixture } = await import(pathToFileURL(path.join(shared,'publisher/test-support/fixtures.mjs')));
const { expectedImageRecords, getSiteProfile } = await import(pathToFileURL(path.join(shared,'publisher/siteProfiles.mjs')));
const profile = getSiteProfile({targetSite:'LifeEducation'});
const root = fs.mkdtempSync(path.join(os.tmpdir(),'life-publisher-ci-'));
const slug = 'ci-fixture';
const title = 'CI Fixture';
const folder = path.join(root,'src/content/posts',slug);
const eventPath = path.join(root,'event.json');

try {
  for (const count of [0,1,4]) {
    fs.rmSync(folder,{recursive:true,force:true});
    fs.mkdirSync(path.join(folder,'images'),{recursive:true});
    const images = expectedImageRecords(profile,count).map(record => {
      const bytes = imageFixture(record.role);
      fs.writeFileSync(path.join(folder,record.file),bytes);
      return {...record,alt:record.role+' illustration.',caption:null,sha256:createHash('sha256').update(bytes).digest('hex')};
    });
    const manifest = {targetSite:profile.targetSite,repository:profile.repository,title,slug,
      excerpt:'CI-only fixture.',publishedAt:'2026-11-26',status:'Draft',topic:'Founding Notes',tags:['LifeEducation'],
      destinationPath:'src/content/posts/'+slug+'/',canonicalUrl:profile.canonicalPrefix+slug,buildCommand:profile.buildCommand,images};
    fs.writeFileSync(path.join(folder,'meta.ts'),[
      'import cardImage from "./images/card-image.webp";',
      'import heroImage from "./images/hero-image.webp";',
      'export const metadata = {title: "CI Fixture", slug: "ci-fixture", excerpt: "CI-only fixture.",',
      'publishedAt: "2026-11-26", status: "Draft", topic: "Founding Notes", tags: ["LifeEducation"],',
      'cardImage, cardAlt: "card illustration.", heroImage, heroAlt: "hero illustration.",};'
    ].join('\n'));
    const bodies=images.filter(image=>image.role.startsWith('body-'));
    fs.writeFileSync(path.join(folder,'index.tsx'),[
      'import { metadata } from "./meta";',
      ...bodies.map((image,i)=>'import body'+i+' from "./'+image.file+'";'),
      'const post = {...metadata, body: <>',
      ...bodies.map((image,i)=>'<PostFigure src={body'+i+'} alt="'+image.alt+'" />'),
      '<a href="/contact">Contact us.</a>','</>}; export default post;'
    ].join('\n'));
    const fence=String.fromCharCode(96);
    const body=['- Site profile: **LifeEducation**','- Handoff method: **Direct GitHub**',
      '- Slug: '+fence+slug+fence,'- Destination: '+fence+manifest.destinationPath+fence,
      '- Canonical URL: '+manifest.canonicalUrl,'## Publisher manifest','',
      fence.repeat(3)+'json',JSON.stringify(manifest),fence.repeat(3)].join('\n');
    const pr={number:1,title:'Publish '+title,html_url:'https://github.com/'+profile.repository+'/pull/1',
      head:{ref:'publisher/'+slug,sha:'a'.repeat(40),repo:{full_name:profile.repository}},base:{ref:'main'},body};
    function run(pull=pr) {
      fs.writeFileSync(eventPath,JSON.stringify({repository:{full_name:profile.repository},pull_request:pull}));
      const result=spawnSync(process.execPath,[path.join(shared,'scripts/validate-publishing-pr.mjs')],{
        cwd:root,env:{...process.env,GITHUB_EVENT_PATH:eventPath},encoding:'utf8'});
      if(result.error) throw result.error;
      return {status:result.status,output:result.stdout+result.stderr};
    }
    const valid=run();
    assert.equal(valid.status,0,valid.output);
    assert.match(valid.output,/Publishing PR contract passed/);
    const missing=run({...pr,body:'- Handoff method: **Direct GitHub**'});
    assert.equal(missing.status,1,missing.output);
    assert.match(missing.output,/manifest JSON/);
    const wrongRepo=run({...pr,head:{...pr.head,repo:{full_name:'example/fork'}}});
    assert.equal(wrongRepo.status,1,wrongRepo.output);
    assert.match(wrongRepo.output,/not from a fork/);
    fs.appendFileSync(path.join(folder,'images/hero-image.webp'),Buffer.from([1]));
    const tampered=run();
    assert.equal(tampered.status,1,tampered.output);
    assert.match(tampered.output,/SHA-256/);
    console.log('LifeEducation '+count+' body roles: valid, missing manifest, fork and tampered bytes verified.');
  }
} finally { fs.rmSync(root,{recursive:true,force:true}); }
