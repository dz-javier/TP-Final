import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLuzPage } from './edit-luz.page';

describe('EditLuzPage', () => {
  let component: EditLuzPage;
  let fixture: ComponentFixture<EditLuzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLuzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLuzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
