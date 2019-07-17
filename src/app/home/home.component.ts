import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const PHOTOS_QUERY = gql`
  query getPhotos {
    getPhotos {
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


const CREATE_LINK_MUTATION = gql`
  mutation createPhotoMock($albumId: ID!, $title: String!, $url: String, $thumbnailUrl: String) {
    createPhotoMock(albumId: $albumId, title: $title, url: $url, thumbnailUrl: $thumbnailUrl) {
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
      console.log (result.data.getPhotos);
      this.photos = result.data.getPhotos;
    });
  }


}
