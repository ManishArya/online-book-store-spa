import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

type AvatarAilgnType = 'center' | 'left' | 'right';
type AvatarSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-avatar',
  templateUrl: './app-avatar.component.html',
  styleUrls: ['./app-avatar.component.scss']
})
export class AppAvatarComponent implements OnChanges, AfterViewInit, OnDestroy {
  public initials: string;
  public colorIndex: number = 1;
  @Input() public imageSrc: string;
  @Input() public canChange: boolean = true;
  @Input() public alignType: AvatarAilgnType = 'right';
  @Input() public size: AvatarSize = 'medium';
  @Input() public isRemoveEnable: boolean;
  @Output() public avatarChanged = new EventEmitter<any>();
  @Output() public avatarRemoved = new EventEmitter<void>();
  @ViewChild('avatar') public avatar: ElementRef;
  private _name: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {}

  @Input()
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public ngOnChanges(): void {
    this.initials = this.getInitials();
    this.colorIndex = this.getColorIndex();
  }

  public ngAfterViewInit(): void {
    fromEvent(this.avatar.nativeElement, 'change')
      .pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe))
      .subscribe((e) => this.uploadAvatar(e));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public changeAvatar(): void {
    if (this.avatar && this.canChange) {
      this.avatar.nativeElement.click();
    }
  }

  public getImage() {
    return `url(data:image/jpg;base64,${this.imageSrc})`;
  }

  public onAvatarRemoved(): void {
    this.avatarRemoved.emit();
  }

  private uploadAvatar(event: any): void {
    const file = event.target.files[0];
    this.avatarChanged.emit(file);
    this.avatar.nativeElement.value = '';
  }

  private getInitials(): string {
    if (this._name) {
      const splitNames = this._name.trim().split(' ');
      const capitalFirstLetter = this.capitalFirstLetter(splitNames[0]);
      let lastName = '';
      if (splitNames.length !== 1) {
        lastName = splitNames[splitNames.length - 1];
      }
      const capitalLastLetter = this.capitalFirstLetter(lastName);
      return `${capitalFirstLetter}${capitalLastLetter}`;
    }
    return '';
  }

  private getColorIndex(): number {
    if (this.name) {
      const seed = this.name.charCodeAt(0) + this.name.charCodeAt(this.name.length - 1) + this.name.length;
      return Math.abs(seed % 6);
    }
    return 1;
  }

  private capitalFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase();
  }
}
