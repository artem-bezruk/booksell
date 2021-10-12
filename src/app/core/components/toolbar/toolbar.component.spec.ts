import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import {CoreModule} from '../../core.module';
import {MatFormFieldModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, MatToolbarModule, MatMenuModule, RouterTestingModule],
      declarations: [ ToolbarComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
