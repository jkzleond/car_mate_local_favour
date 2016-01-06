require.config(
{
	baseUrl: '.',
    paths: {
        jquery: 'jquery-2',
        jqm: 'jquery.mobile-1.4.5',
        jqm_widget_ext: 'jquery.mobile.widget.ext',
        //jqm_simple_dialog: 'jquery.mobile.simplediallog2',
        datetimepicker: 'jquery.datetimepicker',
        jqplot_bar: 'jqplot_bar',
        pcas: 'pcasunzip',
        base64: 'Base64',
        underscore: 'underscore',
        backbone: 'backbone',
        text: 'text',
        routers: 'app/routers',
        models: 'app/models',
        collections: 'app/collections',
        views: 'app/views',
        templates: 'app/templates'
    },
    shim:{
        backbone:{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        pcas: {
            deps: [],
            exports: 'PCAS'
        },
        datetimepicker: {
            deps: ['jquery']
        },
        jqplot_bar: {
            deps: ['jquery']
        }
    }
}
)
