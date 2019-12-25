/*
 * @Author: Diskfan 
 * @Date: 2019-06-17 11:02:22 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-18 11:05:26
 */

<template>
<!-- :height="height" -->
    <el-table
        ref="table"
        :data="data"
        :loading="loading"
        class="el-table-component"
        :max-height="maxHeight"
        :stripe="stripe"
        :border="border"
        :size="size"
        :fit="fit"
        :height="height"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        :indent="indent"
        :lazy="lazy"
        :load="load"
        :tree-props="treeProps"
        :show-header="showHeader"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @header-click="headerClick"
        @header-contextmenu="headerContextmenu"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @current-change="currentChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange"
        >
        <el-table-column
            v-for="(item, key) in showsColumns"
            :type="item.type"
            :column-key="item.prop"
            :width="item.width"
            :sort-by="item.sortBy"
            :sort-orders="item.sortOrders"
            :resizable="item.resizable"
            :formatter="item.formatter"
            :header-align="item.headerAlign"
            :class-name="item.className"
            :label-class-name="item.labelClassName"
            :selectable="item.selectable"
            :reserve-selection="item.reserveSelection"
            :filter-placement='item.filterPlacement'
            :filter-multiple="item.filterMultiple"
            :filtered-value="item.filteredValue"
            :show-overflow-tooltip="item.overflowTip"
            :row-key="item.row-key || key"
            :fixed="item.fixed"
            :align="item.align || 'center'"
            :label="item.label"
            :min-width="item.minWidth"
            :key="key"
            :filters="item.filters"
            :filter-method="item.filterMethod"
            :sortable="item.sortable"
            :sort-method="item.sortMethod">
                <template slot="header">
                    <el-dropdown
                        v-if="item.selectHeader"
                        :hide-on-click="config.hideOnClick"
                        trigger="click"
                        @command="commandHandle">
                        <span class="el-dropdown-link" :style="Object.assign({cursor: 'pointer'}, config.seleteStyle)">
                            {{item.label}}
                            <i :class="config.icon" :style="config.selectIconStyle"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="all">{{config.showAllText}}</el-dropdown-item>
                            <el-dropdown-item
                                v-for="(eitem, ekey) in orgColumns"
                                :key="ekey"
                                :command="eitem.prop">
                                <el-checkbox
                                    :ref="`checkbox${ekey}`"
                                    v-model="eitem.show"
                                    :label="eitem.label"
                                    @change="boxChange(eitem)">
                                </el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <template v-else>{{item.label}}</template>
                </template>
                <template slot-scope="$scope">
                    <template v-if="item.type === 'time'">
                        {{$scope.row[item.prop]|dateFormat(item.format)}}
                    </template>
                    <template v-else-if="/config\|/.test(item.type)">
                        {{converConfig($scope.row[item.prop], item.type)}}
                    </template>
                    <template v-else>
                        {{$scope.row[item.prop]}}
                    </template>
                </template>
        </el-table-column>
        <template v-if="action.actions.length">
            <el-table-column
                v-if="config.headerRender"
                :render-header="action.headerRender"
                :fixed="action.fixed"
                :width="action.width"
                :label="action.label"
                :align="action.align">
                <template class="btns-wrap" slot-scope="$scope">
                    <el-button
                        :title="item.title"
                        v-for="(item, key) in action.actions"
                        :key="key"
                        v-show="showBtns(item, $scope.row, key)"
                        @click="$emit(action.emit, item.action, $scope.row, key)"
                        :type="item.type" size="mini"
                        class="action-btns">
                        {{item.name}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                :fixed="action.fixed"
                :width="action.width"
                :label="action.label"
                :align="action.align"
                :min-width="action.minWidth">
                <template slot="header">
                    <el-dropdown
                        v-if="action.selectHeader"
                        :hide-on-click="config.hideOnClick"
                        trigger="click"
                        @command="commandHandle">
                        <span class="el-dropdown-link" :style="Object.assign({cursor: 'pointer'}, config.seleteStyle)">
                            {{action.label}}
                            <i :class="config.icon" :style="config.selectIconStyle"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="all">{{config.showAllText}}</el-dropdown-item>
                            <el-dropdown-item
                                v-for="(eitem, ekey) in orgColumns"
                                :key="ekey"
                                :command="eitem.prop">
                                <el-checkbox
                                    :ref="`checkbox${ekey}`"
                                    v-model="eitem.show"
                                    :label="eitem.label"
                                    @change="boxChange(eitem)">
                                </el-checkbox>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <template v-else>
                        {{action.label}}
                    </template>
                </template>
                <template class="btns-wrap" slot-scope="$scope">
                    <el-button
                        :title="item.title"
                        v-for="(item, key) in action.actions"
                        :key="key"
                        v-show="showBtns(item, $scope.row, key)"
                        :disabled="disabledBtns(item, $scope.row, key)"
                        @click="$emit(action.emit, item.action, $scope.row, key)"
                        :type="item.type"
                        size="mini"
                        class="action-btns">
                        {{item.name}}
                    </el-button>
                </template>
            </el-table-column>
        </template>
        <slot name="append"></slot>
    </el-table>
</template>
<script>
export default {
    props: {
        cellClassName: {
            default: () => '',
            type: String
        },
        rowStyle: {
            default: () => {},
            type: Object
        },
        rowClassName: {
            default: '',
            type: String
        },
        showHeader: {
            default: true,
            type: Boolean
        },
        size: {
            default: '',
            type: String
        },
        border: {
            default: false,
            type: Boolean
        },
        stripe: {
            default: false,
            type: Boolean
        },
        maxHeight: {
            default: 0
        },
        height: {
            default: '100%'
        },
        headerKey: {
            default: () => '',
            type: String
        },
        columns: {
            required: true,
            default: () => [],
            type: Array
        },
        loading: {
            default: false,
            type: Boolean
        },
        operate: {
            default: null
        },
        data: {
            required: true,
            default: () => [],
            type: Array
        },
        tableConfig: {
            default: () => {},
            type: Object
        },
        fit: {
            default: true,
            type: Boolean
        },
        highlightCurrentRow: {
	        default: () => false,
            type: Boolean
        },
        currentRowKey: {
            default: () => '',
            type: String|Number
        },
        rowClassName: {
            default: () => '',
            type: Object|Function
        },
        cellClassName: {
            default: () => '',
            type: String
        },
        cellStyle: {
            default: () => {},
            type: Object|Function
        },
        headerRowClassName: {
            default: () => '',
            type: String
        },
        headerRowStyle: {
            default: () => {},
            type: Object|Function
        },
        headerCellClassName: {
            default: () => '',
            type: String
        },
        headerCellStyle: {
            default: () => {},
            type: Object|Function
        },
        rowKey: {
            default: () => Math.random().toString(32).replace(/.*\.|\d/g, '').toUpperCase(),
            type: Function
        },
        emptyText: {
            default: () => '',
            type: String
        },
        defaultExpandAll: {
            default: () => '',
            type: String
        },
        expandRowKeys: {
            default: () => [],
            type: Array
        },
        defaultSort: {
            default: () => {},
            type: Object
        },
        tooltipEffect: {
            default: 'light',
            type: String
        },
        showSummary: {
            default: () => '',
            type: String
        },
        sumText: {
            default: () => '',
            type: String
        },
        treeProps: {
            default: () => {},
            type: Object
        },
        summaryMethod: {
            default: () => () => {},
            type: Function
        },
        spanMethod: {
            default: () => () => {},
            type: Function
        },
        selectOnIndeterminate: {
            default: () => '',
            type: String
        },
        indent: {
            default: 0,
            type: Number
        },
        lazy: {
            default: () => '',
            type: String
        },
        load: {
            default: () => () => {},
            type: Function
        },
        selectConfig: {
            default: () => {},
            type: Object
        }
    },
    data () {
        const key = `${this.headerKey}HeaderHide`
        let inHide = localStorage.getItem(key)
        if (inHide) {
            try {
                inHide = JSON.parse(inHide)
            } catch (e) {
                inHide = []
            }
        } else {
            inHide = []
        }
        return {
            inHide: inHide,
            saveKey: key,
            orgColumns: []
        }
    },
    filters: {
        dateFormat (date, fmt = 'YYYY-MM-DD') {
            let newDate = date;
            let fmts = fmt;
            if (!newDate) {
                newDate = new Date;
            }
            if (typeof newDate === 'number') {
                newDate = new Date(newDate);
            } else {
                newDate = new Date(newDate);
            }
            const o = {
                'M+': newDate.getMonth() + 1,
                'D+': newDate.getDate(),
                'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
                'H+': newDate.getHours(),
                'm+': newDate.getMinutes(),
                's+': newDate.getSeconds(),
                'q+': Math.floor((newDate.getMonth() + 3) / 3),
                S: newDate.getMilliseconds(),
            };
            const week = {
                0: '\u65e5',
                1: '\u4e00',
                2: '\u4e8c',
                3: '\u4e09',
                4: '\u56db',
                5: '\u4e94',
                6: '\u516d',
            };
            if (/(Y+)/.test(fmts)) {
                fmts = fmts.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmts)) {
                fmts = fmts.replace(RegExp.$1, () => {
                    if (RegExp.$1.length > 1) {
                        if (RegExp.$1.length > 2) {
                        return `\u661f\u671f${week[newDate.getDay()]}`;
                        }
                        return `\u5468${week[newDate.getDay()]}`;
                    }
                    return week[`${newDate.getDay()}`];
                });
            }
            Object.keys(o)
                .forEach((k) => {
                    if (new RegExp(`(${k})`).test(fmts)) {
                        fmts = fmts.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
                    }
                });
            return fmts;
        }
    },
    methods: {
        boxChange (eitem) {
            const index = this.inHide.indexOf(eitem.prop)
            if (eitem.show && ~index) this.inHide.splice(index, 1)
            else if (!eitem.show && !~index) this.inHide.push(eitem.prop)
            if (!this.saveKey) return
            localStorage.setItem(this.saveKey, JSON.stringify(this.inHide))
        },
        commandHandle (name) {
            if (name === 'all') {
                this.inHide = []
                this.orgColumns.map(el => el.show = true)
                this.showsColumns = this.orgColumns
                localStorage.setItem(this.saveKey, JSON.stringify(this.inHide))
            }
        },
        converConfig (val, type) {
            return this.$config[type.replace(/.*\|/, '')][val] || val
        },
        showBtns (btnitem, row) {
            if (typeof btnitem.show === 'function') {
                return btnitem.show(row)
            }
            return true
        },
        disabledBtns (btnitem, row) {
            if (typeof btnitem.disabled === 'function') {
                return btnitem.disabled(row)
            }
            return true
        },
        clearSelection (...arg) {
            this.$refs.table.clearSelection(...arg)
        },
        toggleAllSelection (...arg) {
            this.$refs.table.toggleAllSelection(...arg)
        },
        toggleRowExpansion (...arg) {
            this.$refs.table.toggleRowExpansion(...arg)
        },
        setCurrentRow (...arg) {
            this.$refs.table.setCurrentRow(...arg)
        },
        clearSort (...arg) {
            this.$refs.table.clearSort(...arg)
        },
        clearFilter (...arg) {
            this.$refs.table.clearFilter(...arg)
        },
        doLayout (...arg) {
            this.$refs.table.doLayout(...arg)
        },
        sort (...arg) {
            this.$refs.table.sort(...arg)
        },
        toggleRowSelection (...arg) {
            this.$refs.table.toggleRowSelection(...arg)
        },
        expandChange (...arg) {
            this.$emit('expandChange', ...arg)
        },
        headerDragend (...arg) {
            this.$emit('headerDragend', ...arg)
        },
        currentChange (...arg) {
            this.$emit('currentChange', ...arg)
        },
        filterChange (...arg) {
            this.$emit('filterChange', ...arg)
        },
        sortChange (...arg) {
            this.$emit('sortChange', ...arg)
        },
        headerContextmenu (...arg) {
            this.$emit('headerContextmenu', ...arg)
        },
        rowContextmenu (...arg) {
            this.$emit('rowContextmenu', ...arg)
        },
        rowClick (...arg) {
            this.$emit('rowClick', ...arg)
        },
        cellDblclick (...arg) {
            this.$emit('cellDblclick', ...arg)
        },
        cellClick (...arg) {
            this.$emit('cellClick', ...arg)
        },
        cellMouseLeave (...arg) {
            this.$emit('cellMouseLeave', ...arg)
        },
        cellMouseEnter (...arg) {
            this.$emit('cellMouseEnter', ...arg)
        },
        selectionChange (...arg) {
            this.$emit('selectionChange', ...arg)
        },
        selectAll (...arg) {
            this.$emit('selectAll', ...arg)
        },
        select (...arg) {
            this.$emit('select', ...arg)
        },
        rowDblclick (...arg) {
            this.$emit('rowDblclick', ...arg)
        },
        headerClick (...arg) {
            this.$emit('headerClick', ...arg)
        }
    },
    computed: {
        showsColumns: {
            get () {
                return this.orgColumns.filter(el => !~this.inHide.indexOf(el.prop))
            },
            set (val) {
                return val
            }
        },
        config () {
            return Object.assign({
                hideOnClick: false,
                showAllText: '全部显示',
                icon: 'el-icon-s-open',
                seleteStyle: {}
            }, Object.assign({}, this.selectConfig))
        },
        action () {
            const action = Object.assign({
                label: '操作',
                prop: 'action',
                minWidth: '120px',
                align: 'center',
                emit: 'btnHandle',
                actions: []
            }, Object.assign({}, this.operate))
            return action
        }
    },
    created () {
        this.orgColumns = this.columns
        this.orgColumns.map(el => el.show = !~this.inHide.indexOf(el.prop))
    }
}
</script>
<style>
    .el-table-component {
        width: 100% !important;
        height: 100% !important;
    }
    .el-table-component .action-btns {
        padding: 4px 3px;
    }
</style>