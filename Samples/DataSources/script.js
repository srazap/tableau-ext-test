tableau.extensions.initializeAsync().then(() => {
  console.log('I have been initialized!!')
});

refreshAllDataSources = () => {  
    const dashboard = tableau.extensions.dashboardContent.dashboard;
    let dataSourceFetchPromises = [];
    let dashboardDataSources = {};

    dashboard.worksheets.forEach((worksheet) => {
        dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
    });
    
    Promise.all(dataSourceFetchPromises).then((fetchResults) => {
        fetchResults.forEach((dataSourcesForWorksheet) => {
            dataSourcesForWorksheet.forEach((dataSource) => {
                if (!dashboardDataSources[dataSource.id]) {
                    dashboardDataSources[dataSource.id] = dataSource;
                    dataSource.refreshAsync();
                }
            });
        });
    });
}

$(document).ready(() => {
    setInterval(
        () => refreshAllDataSources(),
        50000
    );
});