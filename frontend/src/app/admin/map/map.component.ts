import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  @Output() locationSelected = new EventEmitter<string>();
  @Input() lat: number | undefined;
  @Input() lng: number | undefined;
  @Input() allowSelection: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['lat'] || changes['lng'])) {
      this.updateMapLocation();
    }
  }

  private updateMapLocation(): void {
    const defaultLat = this.lat ?? 40.73061; 
    const defaultLng = this.lng ?? -73.935242;
    if (this.map && this.marker) {
      const newLatLng = L.latLng(defaultLat, defaultLng);
      this.map.setView(newLatLng, this.map.getZoom());
      this.marker.setLatLng(newLatLng).bindPopup(` ${this.lat}, ${this.lng}`).openPopup();
    }
  }
  

  private initMap(): void {
    const defaultLat = this.lat ?? 40.73061; 
    const defaultLng = this.lng ?? -73.935242;
    
    this.map = L.map('map', {
      center: [defaultLat, defaultLng], 
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const customIcon = L.icon({
      iconUrl: '/assets/marker.png', 
      iconSize: [25, 25], 
      iconAnchor: [12, 41], 
      popupAnchor: [1, -34]
    });

    if (this.lat !== undefined && this.lng !== undefined) {
      this.marker = L.marker([this.lat, this.lng], { icon: customIcon });
      this.marker.addTo(this.map)
        .bindPopup(`Location: ${this.lat}, ${this.lng}`)
        .openPopup();
    }


    if (this.allowSelection) {
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
  
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
  
        this.marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
  
        const locationString = `${lat}, ${lng}`;
      
        this.locationSelected.emit(locationString);
      });
    }
    
    
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private map!: L.Map;
  private marker!: L.Marker;

}
