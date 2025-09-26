export class Mask {

  static LANG_PT = 'pt-BR';
  static LANG_EN = 'en-US';
  static LANG_ES = 'es-ES';
  static LANG_SE = 'se-SW';

  static getMaskCnpj(): any {
    const mask = {
        mask: '00.000.000/0000-00',
        lazy: false,
        placeholderChar: ' '
    };
    return mask;
  }

  static getMaskCpf(): any {
    const mask = {
        mask: '000.000.000-00',
        lazy: false,
        placeholderChar: ' '
    };
    return mask;
  }

  static getMaskCep(): any {
    const mask = {
        mask: '00000-000',
        lazy: false,
        placeholderChar: '_'
    };
    return mask;
  }

  static getImaskCurrency(scale: number = 2, currencyCode: string = 'BRL'): any {
    const mask = {
        mask: Number,
        scale: scale,
        thousandsSeparator: currencyCode === 'BRL' ? '.' : ',',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: currencyCode === 'BRL' ? ',' : '.',
        signed: true
    };
    return mask;
  }

  static getImaskNumber(language, scale?: number, signed?: boolean): any {
    const radix = (scale === 0 ? ' ' : ',');
    if (scale === undefined) {
        scale = 2;
    }
    const mask = {
        mask: Number,
        scale: scale,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        signed: signed,
        radix: radix
    };
    switch (language) {
        case Mask.LANG_PT:
        case Mask.LANG_ES:
            break;
        case Mask.LANG_EN:
            mask.thousandsSeparator = ',',
            mask.radix = '.';
            break;
        case Mask.LANG_SE:
            mask.thousandsSeparator = ' ',
            mask.radix = ',';
            break;
        default:
            break;
    }
    return mask;
}

  static getImaskNumberBigDecimal(): any {
    const mask = {
        mask: Number,
        scale: 6,
        thousandsSeparator: '.',
        padFractionalZeros: false,
        normalizeZeros: false,
        radix: ',',
    };
    return mask;
  }

  static getImaskLatitudeNumber(): any {
    const mask = {
        mask: Number,
        scale: 8,
        signed: true,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ',',
        min: -99,
        max: 99
    };
    return mask;
  }

  static getImaskLongitudeNumber(): any {
    const mask = {
        mask: Number,
        scale: 8,
        signed: true,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ',',
        min: -999,
        max: 999
    };
    return mask;
  }

  static getImaskTCelPhone(language): any {
      const mask = {
          mask: '(00) 0 0000-0000',
          lazy: false,
          placeholderChar: ' '
      };
      return mask;
  }

  static getImaskTCelPhoneSemDDD(language): any {
    const mask = {
        mask: '0 0000-0000',
        lazy: false,
        placeholderChar: ' '
    };
    return mask;
}

  static getImaskTelephone(language): any {
    const mask = {
        mask: '(00) 0000-0000',
        lazy: false,
        placeholderChar: '_'
    };
    switch (language) {
        case 'pt':
            break;
        case 'en':
            break;
        default:
            break;
    }
    return mask;
  }

  static getImaskTelephoneSemDDD(language): any {
    const mask = {
        mask: '0000-0000',
        lazy: false,
        placeholderChar: ' '
    };
    switch (language) {
        case 'pt':
            break;
        case 'en':
            break;
        default:
            break;
    }
    return mask;
  }

  static getMaskHourMinute(): any {
    const mask = {
        mask: '00:00:00',
        lazy: false,
        placeholderChar: ' '
    };
    return mask;
  }

  static getMaskDate(): any {
    const mask = {
        mask: '00/00/0000',
        lazy: false,
        placeholderChar: ' '
    };
    return mask;
  }

  static getMaskIp(): any {
    const mask = {
      mask: 'IP.IP.IP.IP',
      blocks: {
        IP: {
          mask: '0[00]',
          minLength: 1,
          from: 1,
          to: 255,
        }
      }
    };
    return mask;
  }

  static getMaskImai(): any {
    const mask = {
      mask: '000000-00-000000-0',
      lazy: false,
      placeholderChar: ' '

    };
    return mask;
  }

}
