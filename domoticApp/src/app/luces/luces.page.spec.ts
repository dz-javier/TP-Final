import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LucesPage } from './luces.page';

describe('LucesPage', () => {
  let component: LucesPage;
  let fixture: ComponentFixture<LucesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LucesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LucesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
