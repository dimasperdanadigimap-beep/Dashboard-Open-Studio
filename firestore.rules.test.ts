/**
 * Payload-First Security TDD specification tests for Firestore Rules.
 * Covers the Dirty Dozen attack vectors against StoreOps Studio collections.
 * Intended to be run against the Firebase Emulator Suite (`@firebase/rules-unit-testing`).
 */

export interface DirtyDozenCase {
  id: number;
  name: string;
  collectionPath: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expected: 'PERMISSION_DENIED';
  payload?: Record<string, unknown>;
}

export const DIRTY_DOZEN_PAYLOADS: DirtyDozenCase[] = [
  {
    id: 1,
    name: 'Unauthenticated read on activities',
    collectionPath: 'activities/act_001',
    operation: 'get',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified admin email spoof on storeSettings',
    collectionPath: 'storeSettings/main',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    payload: { storeName: 'Hacked Store' },
  },
  {
    id: 3,
    name: 'Cross-user PII read on /users/{userId}',
    collectionPath: 'users/other_uid',
    operation: 'get',
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow field injection on activity create',
    collectionPath: 'activities/act_shadow',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: {
      storeId: 'store-main',
      date: '2026-11-17',
      monthKey: '2026-11',
      staffId: 'andi-pratama',
      staffName: 'Andi Pratama',
      staffRole: 'Specialist',
      shiftCode: 'P',
      activityType: 'open_studio',
      topic: 'iPhone Camera',
      participantsCount: 4,
      productCategory: '',
      customerNotes: '',
      photoUrl: '',
      photoSource: 'none',
      verificationStatus: 'pending',
      adminNotes: '',
      verifiedByUid: '',
      submittedByUid: 'user_a',
      submittedByName: 'Andi',
      ghostField: 'exploit',
    },
  },
  {
    id: 5,
    name: 'Identity spoofing on activity create',
    collectionPath: 'activities/act_spoof',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: {
      submittedByUid: 'victim_uid',
    },
  },
  {
    id: 6,
    name: 'Self-verification bypass on activity create',
    collectionPath: 'activities/act_self_verify',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: {
      verificationStatus: 'verified',
    },
  },
  {
    id: 7,
    name: 'Terminal state mutation on verified activity by non-admin',
    collectionPath: 'activities/act_already_verified',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    payload: {
      topic: 'Altered after verification',
    },
  },
  {
    id: 8,
    name: 'Non-admin schedule overwrite',
    collectionPath: 'schedules/2026-11',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { monthKey: '2026-11', storeId: 'store-main' },
  },
  {
    id: 9,
    name: 'Non-admin monthly target mutation',
    collectionPath: 'monthlyTargets/2026-11',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    payload: { mode: 'manual' },
  },
  {
    id: 10,
    name: 'Self-admin privilege escalation in /admins',
    collectionPath: 'admins/attacker_uid',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { uid: 'attacker_uid', displayName: 'Attacker', role: 'admin' },
  },
  {
    id: 11,
    name: 'Timestamp forgery on cashierReports create',
    collectionPath: 'cashierReports/rep_forgery',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { createdAt: '2020-01-01T00:00:00Z' },
  },
  {
    id: 12,
    name: 'Resource poisoning with invalid document ID',
    collectionPath: 'activities/invalid$id!name',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { topic: 'Overflow test' },
  },
];
