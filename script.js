const input_initial_value = document.getElementById('initial_value');
const input_monthly_value = document.getElementById('monthly_value');
const input_interest = document.getElementById('interest');
const button = document.getElementById('button')
const response = document.getElementById('response');
const input_duration = document.getElementById('duration');
const select_interest_type = document.getElementById('interest-type')

input_initial_value.addEventListener('input', () => {
  clear_input(input_initial_value);
  format_input_value(input_initial_value);
});

input_monthly_value.addEventListener('input', () => {
  clear_input(input_monthly_value);
  format_input_value(input_monthly_value);
});

button.addEventListener('click', () => {
  let raw_initial = input_initial_value.value.replace(/[^\d,]/g, '').replace(',', '.')
  let raw_monthly = input_monthly_value.value.replace(/[^\d,]/g, '').replace(',', '.')

  let initial_value = parseFloat(raw_initial);
  let monthly_value = parseFloat(raw_monthly);
  let interest_value = Number(input_interest.value);
  let duration = Number(input_duration.value)
  let interest_type = select_interest_type.value

  if (initial_value == '' || duration == '' || interest_value == '' || interest_type == 'none') {
    window.alert('Informações incompletas!');
    return;
  } else if (duration > 600) {
    window.alert('A quantidade de meses inserida é irreal e exagerada. Máximo: 600 meses.')
    } else if (interest_value > 4){
      window.alert('O valor da taxa de juros mensal está exagerado.')
      } else {
    response.innerHTML = ''
    interest_value /= 100
    function format_number_value(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    };    
    const loader = document.getElementById('loader');
    loader.style.display = 'block'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 2500);
    setTimeout(() => {
      let invested = initial_value + monthly_value * duration
      let invested_value = format_number_value(invested)
      if (interest_type == 'compound') {
        let calc = initial_value  * (1 + interest_value) ** duration + 
           monthly_value * (((1 + interest_value) ** duration - 1) / interest_value) * (1 + interest_value);
        let result = format_number_value(calc)
        let calc_profit = calc - invested      
        let profit = format_number_value(Number(calc_profit.toFixed(2)));      
        response.innerHTML = `Valor investido: ${invested_value}<br>`;
        response.innerHTML += `Valor total: ${result}<br>`;
        response.innerHTML += `Lucro: ${profit}`;
    } else if (interest_type == 'simple') {
        let calc = initial_value * (1 + interest_value * duration) +
           (monthly_value * duration) +
           (monthly_value * interest_value * (duration * (duration + 1)) / 2);
        let result = format_number_value(calc)
        let calc_profit = calc - invested      
        let profit = format_number_value(Number(calc_profit.toFixed(2)));              
        response.innerHTML = `Valor investido: ${invested_value}<br>`;
        response.innerHTML += `Valor total: ${result}<br>`;
        response.innerHTML += `Lucro: ${profit}`;      
      }
    }, 2500)
  }
});

function clear_input(input) {
  let raw = input.value.replace(/[^\d]/g, '');
  if (raw === '') {
    input.value = '';
    return '';
  }
  if (raw.length > 15) {
    window.alert('Máximo de 15 digitos.');
    raw = raw.slice(0, 15);
  }
  input.value = raw;
  return raw;
}

function format_input_value(input) {
  let raw = input.value.replace(/[^\d]/g, '');
  if (raw === '') {
    input.value = '';
    return;
  }
  let value = (parseFloat(raw) / 100).toFixed(2);
  input.value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}