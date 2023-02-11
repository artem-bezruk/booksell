import { TestBed } from '@angular/core/testing';
import { StatisticService } from './statistic.service';
import {Type} from '@angular/core';
describe('StatisticService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: StatisticService = TestBed.inject(StatisticService  as Type<StatisticService>);
    expect(service).toBeTruthy();
  });
});
