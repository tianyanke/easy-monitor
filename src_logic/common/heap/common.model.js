'use strict';

// 
module.exports = function (_common, config, logger, utils, cache, common) {
    const HeapSnapshotModel = {};

    HeapSnapshotModel.HeapSnapshotProgressEvent = {
        Update: 'ProgressUpdate',
        BrokenSnapshot: 'BrokenSnapshot'
    };

    HeapSnapshotModel.baseSystemDistance = 100000000;

    HeapSnapshotModel.AllocationNodeCallers = class {
        constructor(nodesWithSingleCaller, branchingCallers) {
            this.nodesWithSingleCaller = nodesWithSingleCaller;
            this.branchingCallers = branchingCallers;
        }
    };

    HeapSnapshotModel.SerializedAllocationNode = class {
        constructor(nodeId, functionName, scriptName, scriptId, line, column, count, size, liveCount, liveSize, hasChildren) {
            this.id = nodeId;
            this.name = functionName;
            this.scriptName = scriptName;
            this.scriptId = scriptId;
            this.line = line;
            this.column = column;
            this.count = count;
            this.size = size;
            this.liveCount = liveCount;
            this.liveSize = liveSize;
            this.hasChildren = hasChildren;
        }
    };

    HeapSnapshotModel.AllocationStackFrame = class {
        constructor(functionName, scriptName, scriptId, line, column) {
            this.functionName = functionName;
            this.scriptName = scriptName;
            this.scriptId = scriptId;
            this.line = line;
            this.column = column;
        }
    };

    HeapSnapshotModel.Node = class {
        constructor(id, name, distance, nodeIndex, retainedSize, selfSize, type) {
            this.id = id;
            this.name = name;
            this.distance = distance;
            this.nodeIndex = nodeIndex;
            this.retainedSize = retainedSize;
            this.selfSize = selfSize;
            this.type = type;

            this.canBeQueried = false;
            this.detachedDOMTreeNode = false;
        }
    };

    HeapSnapshotModel.Edge = class {
        constructor(name, node, type, edgeIndex) {
            this.name = name;
            this.node = node;
            this.type = type;
            this.edgeIndex = edgeIndex;
        }
    };

    HeapSnapshotModel.Aggregate = class {
        constructor() {
            this.count;
            this.distance;
            this.self;
            this.maxRet;
            this.type;
            this.name;
            this.idxs;
        }
    };

    HeapSnapshotModel.AggregateForDiff = class {
        constructor() {
            this.indexes = [];
            this.ids = [];
            this.selfSizes = [];
        }
    };

    HeapSnapshotModel.Diff = class {
        constructor() {
            this.addedCount = 0;
            this.removedCount = 0;
            this.addedSize = 0;
            this.removedSize = 0;
            this.deletedIndexes = [];
            this.addedIndexes = [];
        }
    };

    HeapSnapshotModel.DiffForClass = class {
        constructor() {
            this.addedCount;
            this.removedCount;
            this.addedSize;
            this.removedSize;
            this.deletedIndexes;
            this.addedIndexes;

            this.countDelta;
            this.sizeDelta;
        }
    };

    HeapSnapshotModel.ComparatorConfig = class {
        constructor() {
            this.fieldName1;
            this.ascending1;
            this.fieldName2;
            this.ascending2;
        }
    };

    HeapSnapshotModel.WorkerCommand = class {
        constructor() {
            this.callId;
            this.disposition;
            this.objectId;
            this.newObjectId;
            this.methodName;
            this.methodArguments;
            this.source;
        }
    };

    HeapSnapshotModel.ItemsRange = class {
        constructor(startPosition, endPosition, totalLength, items) {
            this.startPosition = startPosition;
            this.endPosition = endPosition;
            this.totalLength = totalLength;
            this.items = items;
        }
    };

    HeapSnapshotModel.StaticData = class {
        constructor(nodeCount, rootNodeIndex, totalSize, maxJSObjectId) {
            this.nodeCount = nodeCount;
            this.rootNodeIndex = rootNodeIndex;
            this.totalSize = totalSize;
            this.maxJSObjectId = maxJSObjectId;
        }
    };

    HeapSnapshotModel.Statistics = class {
        constructor() {
            this.total;
            this.v8heap;
            this.native;
            this.code;
            this.jsArrays;
            this.strings;
            this.system;
        }
    };

    HeapSnapshotModel.NodeFilter = class {
        constructor(minNodeId, maxNodeId) {
            this.minNodeId = minNodeId;
            this.maxNodeId = maxNodeId;
            this.allocationNodeId;
        }

        equals(o) {
            return this.minNodeId === o.minNodeId && this.maxNodeId === o.maxNodeId &&
                this.allocationNodeId === o.allocationNodeId;
        }
    };

    HeapSnapshotModel.SearchConfig = class {
        constructor(query, caseSensitive, isRegex, shouldJump, jumpBackward) {
            this.query = query;
            this.caseSensitive = caseSensitive;
            this.isRegex = isRegex;
            this.shouldJump = shouldJump;
            this.jumpBackward = jumpBackward;
        }
    };

    HeapSnapshotModel.Samples = class {
        constructor(timestamps, lastAssignedIds, sizes) {
            this.timestamps = timestamps;
            this.lastAssignedIds = lastAssignedIds;
            this.sizes = sizes;
        }
    };

    return HeapSnapshotModel;
}