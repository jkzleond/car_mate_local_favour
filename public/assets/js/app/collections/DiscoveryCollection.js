/**
 * Created by jkzleond on 15-6-9.
 */

define([
    'backbone',
    'models/DiscoveryModel'
],function(Backbone, Discovery){
    var DiscoveryCollection = Backbone.Collection.extend({
        model: Discovery,
        initialize: function(options){
            this.type = options.type;
            //设置初始type,total改变,以便初次获取数据
            this.has_change = ['type','total'];
            this.page = 1;
            //每页条目数
            this.rows = 10;
            //总条目数
            this.total = 0;
        },
        url: function(){
            return '/discoverise'
        },
        parse: function(response, options){
            this._setTotal(response.total);
            return response.rows;
        },
        fetch: function(options){
            //如果各项参数(type, page, rows)未改变直接返回,不获取
            if(this.has_change.length == 0) return;

            var options = options || {};
            options.data = options.data || {};

            options.data.criteria = {
                type: this.type
            };

            var page_change_index = this.has_change.indexOf('page');
            var total_change_index = this.has_change.indexOf('total');
            //如果type改变过就reset集合
            if(this.has_change.indexOf('type') != -1)
            {
                options.reset = true;
            }
            else if(page_change_index != -1 && total_change_index == -1 && this.total < this.page*this.rows)
            {
                //如果type未改变,total未改变(有新条目),page改变,而total数小于要获取的条目号,即已到尾页
                //重置当前页,清除page的改变状态
                this.page -= 1;
                this.has_change.splice(page_change_index, 1);
                return;
            }

            var self = this;
            //包装逻辑到success
            if(typeof options.success === 'function')
            {
                var success = options.success;
                options.success = function(){
                    //成功后清空改变状态记录
                    self.has_change.splice(0, self.has_change.length);
                    success.apply(self, arguments);
                }
            }
            else
            {
                options.success = function(){
                    //成功后清空改变状态记录
                    self.has_change.splice(0, self.has_change.length);
                    self.type_has_change = false;
                }
            }

            options.data.page = options.data.page || this.page;
            options.data.rows = options.data.rows || this.rows;
            Backbone.Collection.prototype.fetch.call(this, options);
        },
        setType: function(type){
            if(this.type != type)
            {
                this.type = type;
                var index = this.has_change.indexOf('type')
                if(index == -1)
                {
                    this.has_change.push('type');
                }
                this.trigger('change:type', this);
            }
            return this;
        },
        //设置当前页
        setPage: function(page){
            if(this.page != page)
            {
                this.page = page;
                var index = this.has_change.indexOf('page')
                if(index == -1)
                {
                    this.has_change.push('page');
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
                var index = this.has_change.indexOf('rows')
                if(index == -1)
                {
                    this.has_change.push('rows');
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
                var index = this.has_change.indexOf('total')
                if(index == -1)
                {
                    this.has_change.push('total');
                }
                this.trigger('change:total', this);
            }
            if(this.total <= this.page * this.rows )
            {
                this.trigger('page_end', this);
            }
            return this;
        },
        //获取下一页数据
        nextPage: function()
        {
            this.setPage(this.page + 1);
            this.fetch();
        }
    });

    return DiscoveryCollection;
});
