import { Injectable } from '@angular/core';
import { Tour, TourConfig, TourStepConfig } from 'siteguide.js';

@Injectable()
export class SiteguideService {
    public readonly tour: Tour;

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
    public addStep(stepConfig: TourStepConfig): void {
        this.tour.addStep(stepConfig);
    }

    /**
     * Add multiple steps to the tour
     * @param stepConfigs array of step config data
     */
    public addSteps(stepConfigs: TourStepConfig[]): void {
        this.tour.addSteps(stepConfigs);
    }

    /**
     * Set tour config
     * @param config tour options
     */
    public setTourConfig(config: TourConfig): void {
        this.tour.setConfig(config);
    }
}
