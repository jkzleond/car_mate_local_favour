/**
 * Created by jkzleond on 15-6-8.
 */
define([
    'jquery',
    'backbone',
    'models/UserModel',
    'models/ClockInModel',
    'models/DiscoveryModel',
    'collections/DiscoveryTypeCollection',
    'collections/DiscoveryCollection',
    'views/UserStateView',
    'views/ClockInView',
    'views/DiscoveryTypeView',
    'views/DiscoveryListView',
    'views/DiscoveryDetailPageView',
    'views/discovery/CommentsPageView',
], function($, Backbone, UserModel, ClockInModel, DiscoveryModel, DiscoveryTypeCollection, DiscoveryCollection, UserStateView, ClockInView, DiscoveryTypeView, DiscoveryListView, DiscoveryDetailPageView, CommentsPageView){
    var LocalFavourRouter = Backbone.Router.extend({
        initialize: function(){
            this.user_state_view = new UserStateView({
                el: $('#user_state'),
                model: new UserModel({
                    user_id: G.user.user_id //设置模型的user_id为当前用户
                })
            });

            this.clock_in_view = new ClockInView({
                el: $('#user_state'),
                model: new ClockInModel()
            });

            //绑定惠金币奖励事件
            $.cm.bind('system.bonus:huiGold', $.proxy(this.bonusHuiGoldHandler, this));

            this.discovery_navbar_view = new DiscoveryTypeView({
                el: '#discovery_navbar',
                collection: new DiscoveryTypeCollection()
            });

            this.discovery_list_view_0 = new DiscoveryListView({
                el: '#discovery_list_view_0',
                collection: new DiscoveryCollection({
                    type: 0
                })
            });
            this.discovery_list_view_6 = new DiscoveryListView({
                el: '#discovery_list_view_6',
                collection: new DiscoveryCollection({
                    type: 6
                })
            });
            this.discovery_list_view_1 = new DiscoveryListView({
                el: '#discovery_list_view_1',
                collection: new DiscoveryCollection({
                    type: 1
                })
            });
            this.discovery_list_view_7 = new DiscoveryListView({
                el: '#discovery_list_view_7',
                collection: new DiscoveryCollection({
                    type: 7
                })
            });
            this.discovery_detail_view = new DiscoveryDetailPageView({
                el: '#discovery_detail_page',
                model: new DiscoveryModel()
            });
            this.listenTo(this.discovery_detail_view.comment_form_view, 'invalid', this._onCommentFormInvalid);
            this.discovery_comments_page_view = new CommentsPageView();
        },
        _onCommentFormInvalid: function(view, err){
            $.cm.toast({msg: err});
        },
        bonusHuiGoldHandler: function(event, value){
            var cur_huigold = this.user_state_view.model.get('HuiGold') || 0;
            this.user_state_view.model.set('HuiGold', Number(cur_huigold) + Number(value));
        },
        routes: {
            '': 'home',
            'dev': 'developing',
            'discoverise(/:type)': 'discoverise',
            'discovery/:id': 'discoveryDetail',
            'discovery/:id/comments': 'discoveryComments'
        },
        home: function(){
            $(':mobile-pagecontainer').pagecontainer('change', '#home_page');

            if(this.user_data_fetched) return;

            this.user_state_view.model.fetch();
            this.clock_in_view.model.fetch();

            this.user_data_fetched = true;
        },
        developing: function(){
            $.cm.toast({msg: '此功能正在开发中,敬请期待'});
        },
        discoverise: function(type){
            var type = type || 0;
            $(':mobile-pagecontainer').pagecontainer('change', '#discovery_page');
            this['discovery_list_view_' + type].collection.fetch();
            var orig_type = this.discovery_navbar_view.collection.type;
            $('discovery_list_view_' + orig_type).hide();
            this.discovery_navbar_view.collection.setActiveType(type);
            //this.discovery_list_view.collection.setType(type);
            //this.discovery_list_view.collection.fetch();
        },
        discoveryDetail: function(id){
            $(':mobile-pagecontainer').pagecontainer('change', '#discovery_detail_page');
            this.discovery_detail_view.model.set('id', id).fetch();
        },
        discoveryComments: function(id){
            console.log(id);
            $(':mobile-pagecontainer').pagecontainer('change', '#discovery_comments_page');
            this.discovery_comments_page_view.setDiscoveryId(id);
        }
    });

    return LocalFavourRouter;
});