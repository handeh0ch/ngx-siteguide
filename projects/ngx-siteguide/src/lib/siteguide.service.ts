import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef, Type } from '@angular/core';
import { Tour, TourConfig, TourStepConfig } from 'siteguide.js';

@Injectable()
export class SiteguideService {
    public readonly tour: Tour;

    private readonly _envInjector: EnvironmentInjector = inject(EnvironmentInjector);

    constructor() {
        this.tour = new Tour({});
    }

    /**
     * Start tour
     */
    public start(): void {
        this.tour.start();
    }

    /**
     * Complete tour
     */
    public complete(): void {
        this.tour.complete();
    }

    /**
     * Add step to the tour
     * @param stepConfig step config data
     */
    public addStep(
        stepConfig: TourStepConfig,
        component: Type<any> | null = null,
        template: TemplateRef<any> | null = null
    ): void {
        const config: TourStepConfig = this.updateStepConfig(stepConfig, component, template);
        this.tour.addStep(config);
    }

    /**
     * Add multiple steps to the tour
     * @param stepConfigs array of step config data
     */
    public addSteps(stepConfigs: TourStepConfig[]): void {
        this.tour.addSteps(stepConfigs);
    }

    /**
     * Add step right after active one
     * @param stepConfig step config data
     */
    public addNext(
        stepConfig: TourStepConfig,
        component: Type<any> | null = null,
        template: TemplateRef<any> | null = null
    ): void {
        const config: TourStepConfig = this.updateStepConfig(stepConfig, component, template);
        this.tour.addNext(config);
    }

    /**
     * Set tour config
     * @param config tour options
     */
    public setTourConfig(config: TourConfig): void {
        this.tour.setConfig(config);
    }

    private getComponentNativeElement(component: Type<any>): HTMLElement {
        const componentRef = createComponent(component, {
            environmentInjector: this._envInjector,
        });

        const nativeElement: HTMLElement = componentRef.location.nativeElement as HTMLElement;

        return nativeElement;
    }

    private updateStepConfig(
        stepConfig: TourStepConfig,
        component: Type<any> | null,
        template: TemplateRef<any> | null
    ): TourStepConfig {
        if (component) {
            stepConfig = {
                ...stepConfig,
                popup: {
                    ...stepConfig.popup,
                    type: 'custom',
                    node: this.getComponentNativeElement(component),
                },
            };
        } else if (template) {
            stepConfig = {
                ...stepConfig,
                popup: {
                    ...stepConfig.popup,
                    type: 'custom',
                    node: template.elementRef.nativeElement,
                },
            };
        }

        return stepConfig;
    }
}
