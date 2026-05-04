```javascript
const readline = require('readline');

// Tasas de cambio (simuladas, en producción vendrían de una API)
const exchangeRates = {
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50,
  'MXN': 17.05,
  'ARS': 850.00,
  'BRL': 4.97
};

// Conversiones de unidades (factores a unidad base)
const unitConversions = {
  length: {
    'm': 1,
    'km': 1000,
    'cm': 0.01,
    'mm': 0.001,
    'mi': 1609.34,
    'yd': 0.9144,
    'ft': 0.3048,
    'in': 0.0254
  },
  weight: {
    'kg': 1,
    'g': 0.001,
    'mg': 0.000001,
    'lb': 0.453592,
    'oz': 0.0283495,
    'ton': 1000
  },
  temperature: {
    'C': 'celsius',
    'F': 'fahrenheit',
    'K': 'kelvin'
  },
  volume: {
    'L': 1,
    'mL': 0.001,
    'gal': 3.78541,
    'qt': 0.946353,
    'pt': 0.473176,
    'cup': 0.236588,
    'fl_oz': 0.0295735
  }
};

// Funciones de conversión
class UnitConverter {
  static convertLength(value, fromUnit, toUnit) {
    const baseValue = value * unitConversions.length[fromUnit];
    return baseValue / unitConversions.length[toUnit];
  }

  static convertWeight(value, fromUnit, toUnit) {
    const baseValue = value * unitConversions.weight[fromUnit];
    return baseValue / unitConversions.weight[toUnit];
  }

  static convertVolume(value, fromUnit, toUnit) {
    const baseValue = value * unitConversions.volume[fromUnit];
    return baseValue / unitConversions.volume[toUnit];
  }

  static convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    if (fromUnit === 'C') {
      celsius = value;
    } else if (fromUnit === 'F') {
      celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'K') {
      celsius = value - 273.15;
    }

    if (toUnit === 'C') {
      return celsius;
    } else if (toUnit === 'F') {
      return (celsius * 9/5) + 32;
    } else if (toUnit === 'K') {
      return celsius + 273.15;
    }
  }
}

class CurrencyConverter {
  static convert(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      throw new Error(`Moneda no soportada. Monedas disponibles: ${Object.keys(exchangeRates).join(', ')}`);
    }
    const usdAmount = amount / exchangeRates[fromCurrency];
    return usdAmount * exchangeRates[toCurrency];
  }

  static getAvailableCurrencies() {
    return Object.keys(exchangeRates);
  }

  static getRate(currency) {
    return exchangeRates[currency];
  }
}

// Interfaz de usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMainMenu() {
  console.log('\n===== CONVERSOR DE UNIDADES Y DIVISAS =====');
  console.log('1. Convertir unidades de longitud');
  console.log('2. Convertir unidades de peso');
  console.log('3. Convertir unidades de volumen');
  console.log('4. Convertir temperatura');
  console.log('5. Convertir divisas');
  console.log('6. Ver tasas de cambio');
  console.log('7. Salir');
  console.log('==========================================\n');
}

function convertLength() {
  rl.question('Valor a convertir: ', (value) => {
    rl.question('Unidad origen (m, km, cm, mm, mi, yd, ft, in): ', (from) => {
      rl.question('Unidad destino: ', (to) => {
        try {
          const result = UnitConverter.convertLength(parseFloat(value), from.toLowerCase(), to.toLowerCase());
          console.log(`\n✓ ${value} ${from} = ${result.toFixed(4)} ${to}\n`);
        } catch (e) {
          console.log(`\n✗ Error: ${e.message}\n`);
        }
        askForAction();
      });
    });
  });
}

function convertWeight() {
  rl.question('Valor a convertir: ', (value) => {
    rl.question('Unidad origen (kg, g, mg, lb, oz, ton): ', (from) => {
      rl.question('Unidad destino: ', (to) => {
        try {
          const result = UnitConverter.convertWeight(parseFloat(value), from.toLowerCase(), to.toLowerCase());
          console.log(`\n✓ ${value} ${from} = ${result.toFixed(4)} ${to}\n`);
        } catch (e) {
          console.log(`\n✗ Error: ${e.message}\n`);
        }
        askForAction();
      });
    });
  });
}

function convert