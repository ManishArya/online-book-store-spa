import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './app-avatar.component.html',
  styleUrls: ['./app-avatar.component.scss']
})
export class AppAvatarComponent implements OnChanges {
  @Input() public imageSrc: string;
  public _name: string;
  public safeResourceUrl: SafeResourceUrl;

  constructor(private _sanitizer: DomSanitizer) {}

  @Input()
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.imageSrc) {
      this.safeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${this.imageSrc}`);
    }

    console.log(changes);
  }
}
