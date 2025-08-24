"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var Folder_vue_1 = require("@/components/Folder.vue");
var AXIOM_FOLDER_NAME = "AXIOM1";
var axiomBookmarkList = (0, vue_1.ref)([]);
var getFolderTreeRecursive = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var folderMeta, node, children, _i, children_1, item, childFolder;
    var folderId = _b.folderId;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, chrome.bookmarks.get(folderId)];
            case 1:
                folderMeta = (_c.sent())[0];
                node = {
                    id: folderMeta.id,
                    title: folderMeta.title,
                    syncing: false,
                    children: [],
                };
                return [4 /*yield*/, chrome.bookmarks.getChildren(folderId)];
            case 2:
                children = _c.sent();
                _i = 0, children_1 = children;
                _c.label = 3;
            case 3:
                if (!(_i < children_1.length)) return [3 /*break*/, 7];
                item = children_1[_i];
                if (!item.url) return [3 /*break*/, 4];
                node.children.push(item);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, getFolderTreeRecursive({
                    folderId: item.id,
                })];
            case 5:
                childFolder = _c.sent();
                node.children.push(childFolder);
                _c.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [2 /*return*/, node];
        }
    });
}); };
var computedList = (0, vue_1.computed)(function () {
    return axiomBookmarkList.value[0].children;
});
(0, vue_1.onMounted)(function () {
    chrome.bookmarks.search({ title: AXIOM_FOLDER_NAME }, function (results) { return __awaiter(void 0, void 0, void 0, function () {
        var axiomFolder, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axiomBookmarkList.value = results;
                    axiomFolder = results.find(function (item) { return item.title === AXIOM_FOLDER_NAME && !item.url; });
                    if (!(axiomFolder === null || axiomFolder === void 0 ? void 0 : axiomFolder.id)) return [3 /*break*/, 2];
                    return [4 /*yield*/, getFolderTreeRecursive({
                            folderId: axiomFolder === null || axiomFolder === void 0 ? void 0 : axiomFolder.id,
                        })];
                case 1:
                    result = _a.sent();
                    axiomBookmarkList.value = [result];
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-title mb-3" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.computedList)); _i < _a.length; _i++) {
    var _b = _a[_i], bookmarkFolder = _b[0], index = _b[1];
    /** @type {[typeof Folder, ]} */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(Folder_vue_1.default, new Folder_vue_1.default({
        key: (index),
        nodes: (bookmarkFolder),
    }));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
            key: (index),
            nodes: (bookmarkFolder),
        }], __VLS_functionalComponentArgsRest(__VLS_0), false));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "text-white" }));
(JSON.stringify(__VLS_ctx.axiomBookmarkList, null, 2));
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            Folder: Folder_vue_1.default,
            axiomBookmarkList: axiomBookmarkList,
            computedList: computedList,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
