import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const PHOTOS_QUERY = gql`
  query getPhotosMock {
    getPhotosMock {
      albumId
      id
      title
      url
      thumbnailUrl
    }
  }
`;

const PHOTO_QUERY = gql`
  query getPhoto($id: ID!) {
    getPhoto(id: $id) {
      albumId
      id
      title
      url
      thumbnailUrl
    }
  }

`;

const CREATE_PHOTO = gql`
  mutation createPhotoMock($data:	PhotoInput!) {
    createPhotoMock(data:	$data)
    {
      albumId
      id
      title
      url
      thumbnailUrl
    }
  }
`;

const DELETE_PHOTO = gql`
  mutation deletePhotoMock($where: PhotoWhere!) {
    deletePhotoMock(where:	$where)
    {
      id
    }
  }
`;

const UPDATE_PHOTO = gql`
  mutation updatePhotoMock($data:	PhotoInput!, $where: PhotoWhere!) {
    updatePhotoMock(data:	$data, where:	$where)
    {
      albumId
      id
      title
      url
      thumbnailUrl
    }
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page = 1;
  photos: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    // this.query = this.apollo.watchQuery({
    //   query: PHOTO_QUERY,
    //   variables: { id: 1 }
    // });

    this.query = this.apollo.watchQuery({
      query: PHOTOS_QUERY
    });

    this.query.valueChanges.subscribe(result => {
      console.log (result);
      console.log (result.data);
      console.log (result.data.getPhotosMock);
      this.photos = result.data.getPhotosMock;
    });

    this.apollo.mutate({
      mutation: CREATE_PHOTO,
      variables: {
        data: {
              albumId: 4,
              title: 'teste 4',
              url: 'teste 4',
              thumbnailUrl: null
              }
      }
    }).subscribe();

    this.apollo.mutate({
      mutation: DELETE_PHOTO,
      variables: {
        where: {
              id: 1
              }
      }
    }).subscribe();

    this.apollo.mutate({
      mutation: UPDATE_PHOTO,
      variables: {
        data: {
          albumId: 5,
          title: 'teste 5',
          url: 'teste 5',
          thumbnailUrl: null
          },
        where: {
              id: 300
              }
      }
    }).subscribe();

    this.query = this.apollo.watchQuery({
      query: PHOTOS_QUERY
    });

    this.query.valueChanges.subscribe(result => {
      console.log (result);
      console.log (result.data);
      console.log (result.data.getPhotosMock);
      this.photos = result.data.getPhotosMock;
    });

  }


}
