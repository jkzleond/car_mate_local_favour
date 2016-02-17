{
	appDir: '..',
	mainConfigFile: '../app/build-config.js',
	dir: '../app-built',
	//fileExclusionRegExp: /^models$/,
	modules: [
		{
			name: 'app/main',
			
			include: [
				'jquery',
				'jqm',
				'jqm_widget_ext',
				'backbone',
				//'routers',
				'routers/LocalFavourRouter', 
				'routers/TourRouter',
				'routers/NewInsuranceRouter',
				'routers/ActivityRouter',
				'routers/CollectionRouter'
			]
		}
	]
}
