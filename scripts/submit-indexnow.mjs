import { execFileSync } from 'node:child_process';

const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
const key = process.env.INDEXNOW_KEY || '';
const expectedCommit = process.env.DEPLOY_SHA || process.env.GITHUB_SHA || '';
const beforeCommit = process.env.BEFORE_SHA || '';
const eventName = process.env.EVENT_NAME || process.env.GITHUB_EVENT_NAME || '';

if (!