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

  photoNumber: number;
  photos: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  save(){
    this.apollo.mutate({
      mutation: CREATE_PHOTO,
      variables: {
        data: {
              albumId: this.photoNumber,
              title: 'teste ' + this.photoNumber.toString(),
              url: 'teste ' + this.photoNumber.toString(),
              thumbnailUrl: null
              }
      }
    }).subscribe(result => this.photos.push(result.data.createPhotoMock) );
  }

  update(){
    this.apollo.mutate({
      mutation: UPDATE_PHOTO,
      variables: {
        data: {
          albumId: this.photoNumber * 10,
          title: 'teste X ' + this.photoNumber.toString(),
          url: 'teste X ' + this.photoNumber.toString(),
          thumbnailUrl: null
          },
        where: {
              id: this.photoNumber
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

  delete(){
    this.apollo.mutate({
      mutation: DELETE_PHOTO,
      variables: {
        where: {
              id: this.photoNumber
              }
      }
    }).subscribe( result =>

        {
          this.query = this.apollo.watchQuery({
            query: PHOTOS_QUERY
          });

          this.query.valueChanges.subscribe(resultQuery => {
            this.photos = resultQuery.data.getPhotosMock;
          });


        }


    );



  }

  ngOnInit() {
    // this.query = this.apollo.watchQuery({
    //   query: PHOTO_QUERY,
    //   variables: { id: 1 }
    // });

    this.photoNumber = 1;

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
