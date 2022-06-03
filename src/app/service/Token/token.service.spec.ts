import { not } from '@angular/compiler/src/output/output_ast';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/interfaces/User.interfaces';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });
  describe('> tokenMethod',()=>{
    it("devrais exister une fonction getToken",()=>{
      expect(typeof service.getToken).toEqual('function');
    });
    it("devrais exister une fonction setToken",()=>{
      expect(typeof service.setToken).toEqual('function');
    });
    it("devrai definir et recuperer un token",()=>{
      service.setToken('hey');
      expect(service.getToken()).toEqual('hey');
    });
  })
  
  describe('> userMethod',()=>{
    it("devrais exister une fonction getMyUser",()=>{
      expect(typeof service.getMyUser).toEqual('function');
    });
    it("devrais exister une fonction setMyUser",()=>{
      expect(typeof service.setMyUser).toEqual('function');
    });
    it("devrai definir et recuperer un user",()=>{
      let user : User = {
        email : "my.email@gmail.com",
        pseudo : "mon pseudo",
        password : "superSecret",
        avatar : "",
        id : 50,
        niveau : 1,
        token : "qdsfqsd"
      }
      service.setMyUser(user);
      expect(service.getMyUser()).toEqual(user);
    });
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
