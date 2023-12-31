var data = {
    labels: ["Dispositivo 1", "Dispositivo 2", "Dispositivo 3"],
    datasets: [
      {
        label: "Consumo en kWh",
        data: [300, 500, 200],
        backgroundColor: ["rgba(211, 160, 7, 1)", "rgba(239, 184, 16, 1)", "rgba(249, 219, 74, 1)"],
        hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
        borderWidth: 1
      }
    ]
  };

  
  var pieCtx = document.getElementById("pieChart").getContext("2d");
  
  var totalConsumo = data.datasets[0].data.reduce((total, currentValue) => total + currentValue, 0);
  var porcentajes = data.datasets[0].data.map(value => ((value / totalConsumo) * 100).toFixed(2) + "%");
  
  var pieChart = new Chart(pieCtx, {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Gráfico Circular de Consumo de Dispositivos"
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.label || "";
              var value = context.formattedValue || "";
              var percentage = porcentajes[context.dataIndex] || "";
  
              return label + ": " + value + " kWh (" + percentage + ")";
            }
          }
        }
      }
    }
  });
  
var originalData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
        {
            label: 'Dispositivo 1',
            data: [10, 20, 30, 15, 25, 35, 20],
            backgroundColor: 'rgba(211, 160, 7, 1)',
            hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
            borderWidth: 1
        },
        {
            label: 'Dispositivo 2',
            data: [15, 25, 35, 20, 30, 40, 25],
            backgroundColor: 'rgba(239, 184, 16, 1)',
            hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
            borderWidth: 1
        },
        {
            label: 'Dispositivo 3',
            data: [20, 30, 40, 25, 35, 45, 30],
            backgroundColor: 'rgba(249, 219, 74, 1)',
            hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
            borderWidth: 1
        }
    ]
};

var barCtx = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(barCtx, {
    type: 'bar',
    data: originalData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Consumo (kWh)'
                }
            }
        }
    }
});

function applyFilter() {
    var select = document.getElementById('filterSelect');
    var selectedValue = select.value;

    if (selectedValue === 'all') {
        resetData();
    } else {
        filterData(selectedValue);
    }
}

function filterData(day) {
    var filteredData = {
        labels: [day],
        datasets: [
            {
                label: 'Dispositivo 1',
                data: [originalData.datasets[0].data[originalData.labels.indexOf(day)]],
                backgroundColor: 'rgba(211, 160, 7, 1)',
                hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
                borderWidth: 1
            },
            {
                label: 'Dispositivo 2',
                data: [originalData.datasets[1].data[originalData.labels.indexOf(day)]],
                backgroundColor: 'rgba(239, 184, 16, 1)',
                hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
                borderWidth: 1
            },
            {
                label: 'Dispositivo 3',
                data: [originalData.datasets[2].data[originalData.labels.indexOf(day)]],
                backgroundColor: 'rgba(249, 219, 74, 1)',
                hoverBackgroundColor: 'rgba(102, 102, 102, 1)',
                borderWidth: 1
            }
        ]
    };

    barChart.data = filteredData;
    barChart.update();
}

function resetData() {
    barChart.data = originalData;
    barChart.update();
}

var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var monthlyData = [150, 200, 180, 250, 300, 400, 350, 300, 280, 230, 180, 200];

var lineCtx = document.getElementById("lineChart").getContext("2d");

var lineChart = new Chart(lineCtx, {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        label: "Consumo en kWh",
        data: monthlyData,
        backgroundColor: "rgba(239, 184, 16, 1)",
        borderColor: "rgba(239, 184, 16, 1)",
        hoverBackgroundColor: 'rgba(255, 214, 10, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// Obtener la fecha actual en el huso horario GMT-05:00 (Lima, Perú)
var fechaActual = new Date();

// Obtener el primer y último día de la semana actual
var primerDiaSemana = fechaActual.getDate() - fechaActual.getDay() + 1;
var ultimoDiaSemana = primerDiaSemana + 6;

var primerDiaSemanaObj = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), primerDiaSemana);
var ultimoDiaSemanaObj = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), ultimoDiaSemana);

// Formatear las fechas en formato dd/mm/aaaa
var primerDiaSemanaFormatted = primerDiaSemanaObj.toLocaleDateString("es-ES");
var ultimoDiaSemanaFormatted = ultimoDiaSemanaObj.toLocaleDateString("es-ES");

// Obtener el nombre del mes y el año actual
var nombreMesActual = fechaActual.toLocaleDateString("es-ES", { month: "long" });
var anioActual = fechaActual.getFullYear();

// Crear los textos deseados
var textoRangoSemana = "Desde " + primerDiaSemanaFormatted + " hasta " + ultimoDiaSemanaFormatted;
var textoMesActual = nombreMesActual + " " + anioActual;
var textoAnioActual = anioActual;

// Imprimir los resultados
console.log("Rango de la semana actual:", textoRangoSemana);
console.log("Mes actual:", textoMesActual);
console.log("Año actual:", textoAnioActual);


function actualizarInformacion() {
    // Obtener los elementos en los que deseas mostrar la información
    var rangoSemanaElement = document.getElementById("rangoSemana");
    var mesActualElement = document.getElementById("mesActual");
    var anioActualElement = document.getElementById("anioActual");

    // Actualizar el contenido de los elementos con la información obtenida
    rangoSemanaElement.textContent = textoRangoSemana;
    mesActualElement.textContent = textoMesActual;
    anioActualElement.textContent = textoAnioActual;
  }
  window.onload = actualizarInformacion;
