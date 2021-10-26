import { Injectable } from '@angular/core';
import * as aws from 'amazon-product-api';
import {IAmazonProductClient} from 'amazon-product-api';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
@Injectable()
export class AwsProductAdvertApiService {
   public client: IAmazonProductClient;
  constructor() {
    this.client = aws.createClient({
      awsId: 'aws-Id',
      awsSecret: 'aws-Secret',
      awsTag: 'aws-Tag'
    });
  }
  public searchBookByIsbn(isbn: string): Observable<any> {
    return fromPromise(this.client.itemLookup({
      idType: 'ISBN',
      itemId: isbn,
      searchIndex: 'Books',
      responseGroup: 'Medium'
    }));
  }
}
