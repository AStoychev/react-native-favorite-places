export class Place {
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.imageUrl = imageUri;
        this.address = location.address;
        this.location = { lat: location.lat, lng: location.lng };
        this.id = id;
        // this.id = new Date().toString() + Math.random().toString();
    }
}