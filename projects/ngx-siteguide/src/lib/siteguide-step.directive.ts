import { Directive, inject, Input, OnInit } from '@angular/core';
import { TourStepConfig } from 'siteguide.js';
import { SiteguideService } from './siteguide.service';

@Directive({
    selector: '[siteguideStep]',
    standalone: true,
})
export class SiteguideStepDirective implements OnInit {
    @Input({ required: true, alias: 'siteguideStep' })
    public readonly stepData!: TourStepConfig;

    private readonly _siteguideService: SiteguideService = inject(SiteguideService);

    public ngOnInit(): void {
        this._siteguideService.addStep(this.stepData);
    }
}
