import type { State } from '@vincjo/datatables/server';

export type RequestState = Omit<State, 'currentPage', 'setTotalRows'>;
