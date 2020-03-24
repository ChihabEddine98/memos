
$(document).ready(function(){

    $('#getNbMemosBtn').click(()=>{
        $.ajax({
            url: "/admin/stats_data",  
            method: 'GET',
            success: function(data){
                var ctx = $('#users_nb_memo')
                
                console.log(data)

                var user_nb_memo_chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data['labels'],
                        datasets: [{
                            label: 'Nombre De Mémos',
                            data: data['values'],
                            borderWidth: 1,
                            backgroundColor: '#ffcce7',
                            borderColor :'#ff66b8'
                        }]
                    },
                  options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    responsive: false
                    
                }
                })

            }
        } )
    })


    $('#getNbSharesBtn').click(()=>{

        $.ajax({
            url: "/admin/stats_shared_data",  
            method: 'GET',
            success: function(data){
                var cts = $('#users_sharing')
                
                console.log(data)

                var user_nb_memo_chart = new Chart(cts, {
                    type: 'line',
                    data: {
                        labels: data['labels'],
                        datasets: [{
                            label: 'Nombre De Partage',
                            data: data['values'],
                            borderWidth: 1,
                            backgroundColor: '#89f6fa',
                            borderColor :'#00BFFF'
                        }]
                    },
                  options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    responsive: false
                    
                }
                })

            }
        } )
    })

    $('#getNbSharesMemoBtn').click(()=>{

        $.ajax({
            url: "/admin/stats_shared_memo_data",  
            method: 'GET',
            success: function(data){
                var cts = $('#users_sharing_memo')
                
                console.log(data)

                var memo_nb_shares_chart = new Chart(cts, {
                    type: 'line',
                    data: {
                        labels: data['labels'],
                        datasets: [{
                            label: 'Nombre De Partage Pour Chaque Mémo',
                            data: data['values'],
                            borderWidth: 1,
                            backgroundColor: '#78f0ba',
                            borderColor :'#2ec782'
                        }]
                    },
                  options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    responsive: false
                    
                }
                })

            }
        } )
    })

    $('#getNbMemosBtn').trigger('click');
    $('#getNbSharesBtn').trigger('click');
    $('#getNbSharesMemoBtn').trigger('click');

  });
