import { User, UserRole } from '@app/app/shared/models/user';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { RequestInfo } from 'angular-in-memory-web-api/interfaces'

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const users: User[] = [
      { userId: 1, email: 'test', token: 'fsfsd', name: 'test1', surname: 'test1', roles: [UserRole.ADMIN] },
      { userId: 2, email: 'test2', token: 'gfdgd', name: 'test2', surname: 'test2', roles: [UserRole.KGT_MEMBER] },

    ];
    return { users };
  }

  // TODO: remove comments

  // HTTP POST interceptor
  post(reqInfo: RequestInfo) {
    // if client pinged users/authenticate call authenticate
    if (reqInfo.collectionName === 'authenticate')
      return this.authenticate(reqInfo)

    //  otherwise default response of In-memory DB
    return undefined
  }

  // mocking authentication happens here
  // HTTP POST interceptor handler
  private authenticate(reqInfo: RequestInfo) {

    // return an Observable response
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP POST api/users/authentication override')

      const { headers, url, req } = reqInfo

      // if request username and passord are correct
      //  return response with a JSONWebToken
      // const { email, password } = req['body']
      const { email, password } = reqInfo.utils.getJsonBody(req);
      if (email === 'admin' && password === '1234')
        return {
          status: 200,
          headers, // reqInfo (line 30)
          url, // reqInfo (line 30)
          body: {
            userId: 1, email: 'admin', name: 'test1', surname: 'test1', roles: [UserRole.ADMIN],
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          }
        }

      //  otherwise return response with status code 401 (unauthorized)
      return {
        status: 401,
        headers,
        url,
        body: {
          errorMessage: "Unauthorized user (code 401)"
        }
      }
    })
  }
}