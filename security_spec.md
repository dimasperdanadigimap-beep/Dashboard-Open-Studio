# Security Specification & Payload-First Security TDD

## 1. Data Invariants
1. **Default Deny**: Any unmatched path in Firestore is denied (`read, write: if false`).
2. **Email Verification Gate**: All authenticated reads and writes require `request.auth != null && request.auth.token.email_verified == true`.
3. **PII Isolation**: `/users/{userId}` contains `email` and is readable/writable strictly by the owner (`request.auth.uid == userId`) or a verified admin (`isAdmin()`). Staff names in `/schedules` and `/activities` contain zero PII (no email, phone, or address).
4. **Admin Privilege Boundary**: Only the bootstrapped verified admin (`dimasperdana83@gmail.com` with `email_verified == true`) or UIDs explicitly listed in `/admins/{uid}` may write to `/admins`, `/storeSettings`, `/schedules`, `/schedules/{monthKey}/staff`, `/monthlyTargets`, or verify/reject `/activities`. Users cannot self-assign admin roles in `/users/{userId}`.
5. **Identity Integrity & Immutability**: On create of `/activities` and `/cashierReports`, `submittedByUid` must equal `request.auth.uid`, and `createdAt == request.time`, `updatedAt == request.time`. On update, `submittedByUid` and `createdAt` are immutable.
6. **Terminal State Locking**: Once a `StaffActivity` reaches `verificationStatus == 'verified'`, the submitting staff member can no longer edit it; only an Admin can override or update it. Staff cannot set `verificationStatus` to `'verified'` on create or update.
7. **Strict Shape & Size Bounds**: Every string field enforces `.size() <= maxLength`, every document ID matches `^[a-zA-Z0-9_\-]+$`, and `hasAll` + `hasOnly` / `affectedKeys().hasOnly()` block shadow fields.

## 2. The "Dirty Dozen" Attack Payloads (All Must Return PERMISSION_DENIED)
1. **Unauthenticated Read/Write**: Read `/activities` or write `/activities/act_1` with `auth: null`.
2. **Unverified Email Spoof**: Write `/storeSettings/main` using `{ email: "dimasperdana83@gmail.com", email_verified: false }`.
3. **PII Leak Attempt**: Signed-in non-admin User A attempts `get` or `list` on `/users/userB` or `/users`.
4. **Shadow Field Injection on Activity Create**: User A creates `/activities/act_1` with valid fields plus `{ isAdminOverride: true }`.
5. **Identity Spoofing on Activity Create**: User A creates `/activities/act_1` with `submittedByUid: "userB"`.
6. **Self-Verification Bypass**: User A creates `/activities/act_1` with `verificationStatus: "verified"`.
7. **Terminal State Mutation by Non-Admin**: User A updates `/activities/act_verified` (where existing `verificationStatus == "verified"`) trying to change `topic`.
8. **Non-Admin Schedule Overwrite**: User A attempts to create or update `/schedules/2026-11` or `/schedules/2026-11/staff/andi`.
9. **Non-Admin Target Manipulation**: User A attempts to update `/monthlyTargets/2026-11` to lower quotas.
10. **Self-Admin Escalation**: User A attempts to create `/admins/userA` or update `/users/userA` with `{ role: "admin" }`.
11. **Timestamp Forgery**: User A creates `/activities/act_1` with a backdated `createdAt` timestamp not equal to `request.time`.
12. **Resource Poisoning / Invalid ID**: User A attempts to create `/activities/bad$id..with..slashes` or a `customerNotes` string > 500 chars.
