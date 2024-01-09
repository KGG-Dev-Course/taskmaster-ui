import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryListComponent } from './gallery-list.component';

describe('GalleryListComponent', () => {
  let component: GalleryListComponent;
  let fixture: ComponentFixture<GalleryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
