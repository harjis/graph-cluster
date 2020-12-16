import { Edge } from '../../../api/edges';
import { Node } from '../../../api/nodes';
import { Errors } from '../../../types';

export type SavingAction = { type: 'SAVING'; isSaving: boolean };
export type Offset = { x: number; y: number };
type AddNode = { type: 'NODES/ADD'; node: Node };
type FetchNodesStart = { type: 'NODES/FETCH_START' };
type FetchNodesSuccess = { type: 'NODES/FETCH_SUCCESS'; nodes: Node[] };
type FetchNodesError = { type: 'NODES/FETCH_ERROR'; error: string };
type InvalidNode = { type: 'NODES/INVALID_NODE'; errors: Errors };
type StartNodeDrag = {
  type: 'NODES/START_DRAG';
  nodeId: number;
  nodeOffset: Offset;
};
type DragNode = { type: 'NODES/DRAG'; pageX: number; pageY: number };
type StopNodeDrag = { type: 'NODES/STOP_DRAG' };
export type NodeAction =
  | AddNode
  | FetchNodesStart
  | FetchNodesSuccess
  | FetchNodesError
  | StartNodeDrag
  | InvalidNode
  | DragNode
  | StopNodeDrag;

export type AddEdge = { type: 'EDGES/ADD'; edge: Edge };
type FetchEdgesStart = { type: 'EDGES/FETCH_START' };
type FetchEdgesSuccess = { type: 'EDGES/FETCH_SUCCESS'; edges: Edge[] };
type FetchEdgesError = { type: 'EDGES/FETCH_ERROR'; error: string };
export type DeleteEdge = { type: 'EDGES/DELETE'; edge: Edge };
export type EdgeAction =
  | AddEdge
  | FetchEdgesStart
  | FetchEdgesSuccess
  | FetchEdgesError
  | DeleteEdge;
