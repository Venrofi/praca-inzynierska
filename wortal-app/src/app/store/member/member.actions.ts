import { createAction, props } from '@ngrx/store';
import { Member } from 'src/app/core/core.model';

// Define actions using createAction
export const update = createAction('[Member] Update', props<{ member: Member | undefined }>());

