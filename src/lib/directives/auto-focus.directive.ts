import { Directive, ElementRef, inject, input, afterNextRender } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutofocusDirective {
  // Substitui o @Input() antigo por Signal Input com valor padrão falso
  readonly appAutoFocus = input<boolean>(false, { transform: (v) => v !== false });

  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    // Registra o callback no contexto de injeção correto
    afterNextRender(() => {
      // Se a diretiva foi ativada como true, foca o elemento imediatamente após o render
      if (this.appAutoFocus()) {
        this.el.nativeElement.focus();
      }
    });
  }
}
