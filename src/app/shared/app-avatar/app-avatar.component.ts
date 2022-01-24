import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './app-avatar.component.html',
  styleUrls: ['./app-avatar.component.scss']
})
export class AppAvatarComponent implements OnChanges {
  public safeResourceUrl: SafeResourceUrl;
  @Input() public imageSrc: string;
  public initials: string;
  private _name: string;

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

    this.initials = this.getInitials();
  }

  public changePhoto(): void {}

  public uploadPhoto(event: any): void {}

  private getInitials(): string {
    if (this._name) {
      const splitNames = this._name.trim().split(' ');
      const capitalFirstLetter = this.capitalFirstLetter(splitNames[0]);
      const lastName = splitNames[splitNames.length - 1];
      const capitalLastLetter = this.capitalFirstLetter(lastName);
      return `${capitalFirstLetter}${capitalLastLetter}`;
    }
    return '';
  }

  private capitalFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase();
  }
}
