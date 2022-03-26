import { TestBed } from '@angular/core/testing';

import { SelectAmigoService } from './select-amigo.service';

describe('SelectAmigoService', () => {
  let service: SelectAmigoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAmigoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
