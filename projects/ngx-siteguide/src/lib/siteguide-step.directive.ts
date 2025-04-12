import { Directive, ElementRef, inject, Input, OnInit, TemplateRef, Type } from '@angular/core';
import { TourStepConfig } from 'siteguide.js';
import { SiteguideService } from './siteguide.service';

@Directive({
    selector: '[siteguideStep]',
    standalone: true,
})
export class SiteguideStepDirective implements OnInit {
    @Input({ required: true, alias: 'siteguideStep' })
    public readonly stepData!: TourStepConfig;

    @Input({ required: false })
    public readonly template: TemplateRef<any> | null = null;

    @Input({ required: false })
    public readonly component: Type<any> | null = null;

    private readonly _elementRef: ElementRef<any> = inject(ElementRef);
    private readonly _siteguideService: SiteguideService = inject(SiteguideService);

    public ngOnInit(): void {
        this._siteguideService.addStep(
            {
                ...this.stepData,
                host: this._elementRef.nativeElement,
            },
            this.component,
            this.template
        );
    }
}
