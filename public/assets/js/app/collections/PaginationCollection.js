/**
 * Created by jkzleond on 15-6-27.
 */

/**
 * 支持分页的集合
 */
define([
    'backbone'
], function(Backbone){
    var PaginationCollection = Backbone.Collection.extend({
        initialize: function(models, options){
            options || (options = {});
            this.page = options.page || 1;
            this.rows = options.rows || 10;
            this.total = options.total || 0;
            this.has_change = {page: true, rows: true, total: true};
        },
        parse: function(response, options){
            this._setTotal(response.total);
            return response.rows;
        },
        fetch: function(options){

            options || (options = {});

            var has_change_field = false;
            for(var prop in this. has_change)
            {
                //如果属性改变
                if(this.has_change[prop])
                {
                    has_change_field = true;
                    break;
                }
            }
            if(!has_change_field) return; //如果没有属性发生改变,直接返回

            var self = this;
            //包装逻辑到success

            var success = options.success;
            options.success = function(){
                //成功后清空改变状态记录
                for(var prop in self.has_change)
                {
                    self.has_change[prop] = false;
                }
                if(typeof success === 'function') success.apply(self, arguments);
            };

            options.data || ( options.data = {} );

            options.data.page = options.data.page || this.page;
            options.data.rows = options.data.rows || this.rows;

            Backbone.Collection.prototype.fetch.call(this, options);
        },
        //设置当前页
        setPage: function(page){
            if(this.page != page)
            {
                this.page = page;
                if(!this.has_change.page)
                {
                    this.has_change.page = true;
                }
                this.trigger('change:page', this);
            }
            return this;
        },
        //设置每页显示条目数(page size,在此处是每次加载条目数)
        setRows: function(row_num){
            if(this.rows != row_num)
            {
                this.rows = row_num;
                if(!this.has_change.rows)
                {
                    this.has_change.rows = true;
                }
                this.trigger('change:rows', this);
            }
            return this;
        },
        _setTotal: function(total)
        {
            if(this.total != total)
            {
                this.total = total;
                if(!this.has_change.total)
                {
                    this.has_change.total = true;
                }
                this.trigger('change:total', this);
            }

            if(this.total <= this.page * this.rows )
            {
                this.trigger('page_end', this);
            }

            return this;
        },
        reset: function(){
            this.has_change.page = true;
            this.has_change.rows = true;
            this.has_change.total = true;
            this.page = 1;
            this.total = 0;
            Backbone.Collection.prototype.reset.apply(this, arguments);
        },
        //获取下一页数据
        nextPage: function()
        {
            this.setPage(this.page + 1);
            this.fetch();
        }
    });
    return PaginationCollection;
});
