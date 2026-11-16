import { TemporizadorAtualizacao } from './temporizador-atualizacao';
import { UpdateComponentService } from './update-component.service';

describe('TemporizadorAtualizacao & UpdateComponentService', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('TemporizadorAtualizacao', () => {
    it('dois TemporizadorAtualizacao com intervalos diferentes não interferem um no outro', () => {
      const timerA = new TemporizadorAtualizacao();
      const timerB = new TemporizadorAtualizacao();

      timerA.updateIntervalo(10);
      timerB.updateIntervalo(30);

      timerA.initTimer();
      timerB.initTimer();

      expect(timerA.contadorUpdate).toBe(10);
      expect(timerB.contadorUpdate).toBe(30);

      // Avança 5 segundos
      jasmine.clock().tick(5000);

      expect(timerA.contadorUpdate).toBe(5);
      expect(timerA.display).toBe('00:05');
      expect(timerB.contadorUpdate).toBe(25);
      expect(timerB.display).toBe('00:25');

      // Avança mais 5 segundos (timerA atinge 0 e reinicia para 10; timerB vai a 20)
      jasmine.clock().tick(5000);

      expect(timerA.contadorUpdate).toBe(10);
      expect(timerB.contadorUpdate).toBe(20);
      expect(timerB.display).toBe('00:20');

      timerA.stopIntervalo();
      timerB.stopIntervalo();
    });

    it('stopIntervalo de um não para o outro', () => {
      const timerA = new TemporizadorAtualizacao();
      const timerB = new TemporizadorAtualizacao();

      timerA.updateIntervalo(20);
      timerB.updateIntervalo(20);

      timerA.initTimer();
      timerB.initTimer();

      jasmine.clock().tick(3000);
      expect(timerA.contadorUpdate).toBe(17);
      expect(timerB.contadorUpdate).toBe(17);

      // Para apenas o timerA
      timerA.stopIntervalo();

      jasmine.clock().tick(4000);

      // timerA deve permanecer em 17
      expect(timerA.contadorUpdate).toBe(17);
      // timerB deve continuar decrescendo normalmente (17 - 4 = 13)
      expect(timerB.contadorUpdate).toBe(13);

      timerB.stopIntervalo();
    });

    it('respeita stopZero evitando emissão/reset quando contador chega a zero', () => {
      const timer = new TemporizadorAtualizacao();
      let emitCount = 0;
      timer.update$.subscribe(val => {
        if (val) emitCount++;
      });

      timer.updateIntervalo(3, true);
      timer.initTimer();

      jasmine.clock().tick(3000);
      expect(timer.contadorUpdate).toBe(0);
      expect(emitCount).toBe(0);

      timer.stopIntervalo();
    });
  });

  describe('UpdateComponentService', () => {
    it('o UpdateComponentService continua emitindo update$ como antes', () => {
      const service = new UpdateComponentService();
      const emissoes: boolean[] = [];

      service.update$.subscribe(val => emissoes.push(val));
      // BehaviorSubject emite false inicialmente
      expect(emissoes).toEqual([false]);

      service.updateIntervalo(3);
      service.initTimer();

      // Avança 3 segundos até zerar
      jasmine.clock().tick(3000);

      // Ao zerar, updateScreen() emite true e em seguida false, resetando o contador
      expect(emissoes).toEqual([false, true, false]);
      expect(service.contadorUpdate).toBe(3);

      // Chamada manual de updateScreen()
      service.updateScreen();
      expect(emissoes).toEqual([false, true, false, true, false]);

      service.stopIntervalo();
    });

    it('delega propriedades e métodos para a instância interna', () => {
      const service = new UpdateComponentService();
      service.updateIntervalo(60);
      expect(service.intervaloUpdate).toBe(60);
      expect(service.contadorUpdate).toBe(60);
      expect(service.stopZero).toBe(false);

      service.setDisplay(90);
      expect(service.display).toBe('01:30');

      service.ngOnDestroy();
      expect(service.vTimerUpdate).toBeNull();
    });
  });
});

