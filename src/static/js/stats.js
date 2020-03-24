
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
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor :'rgba(255, 99, 132, 0.2)'
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
            url: "/admin/stats_data",  
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
                            backgroundColor: 'rgba(0, 99, 132, 0.2)',
                            borderColor :'rgba(255, 99, 132, 0.2)'
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

  });
