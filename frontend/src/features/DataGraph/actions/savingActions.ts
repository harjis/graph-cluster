import { SavingAction } from '../constants/types';

export function setSaving(isSaving: boolean): SavingAction {
  return { type: 'SAVING', isSaving };
}
