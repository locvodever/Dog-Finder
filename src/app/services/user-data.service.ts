import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  data: { page: number; breedIdsVotedInCurrentPage: number[] } = {page: 0, breedIdsVotedInCurrentPage: []};
  constructor() {
    this.getData();
  }

  getData(){
    const dataStr = localStorage.getItem('data');
    if(!dataStr) {
      this.data = {
        page: 0,
        breedIdsVotedInCurrentPage: []
      }
      this.setData(this.data);
      return;
    }
    this.data = JSON.parse(dataStr);
  };

  setData(option: any) {
    this.data = {
      ...(this.data || {}),
      ...option
    }
   localStorage.setItem('data', JSON.stringify(this.data));
  }

  votedDogbreed(id: number) {
    const { page, breedIdsVotedInCurrentPage } = this.data;
    const _breedIdsVotedInCurrentPage = [...(breedIdsVotedInCurrentPage || []), id];
    if (_breedIdsVotedInCurrentPage.length === 10) {
      this.setData({
        breedIdsVotedInCurrentPage: [],
        page: page + 1,
      });
    } else {
      this.setData({
        breedIdsVotedInCurrentPage: _breedIdsVotedInCurrentPage,
      });
    }

  }
}
