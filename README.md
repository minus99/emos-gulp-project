# emos-v2-localhost
## İlk Yükleme
- [node.js](https://nodejs.org/en/) ve [git](https://git-scm.com/) kur
- global paketleri yükle: `npm install -g gulp-cli`

## Projeye Katılmak İçin
- repoyu çek: `git clone https://github.com/minus99/emos-v2-localhost`
- klasör içindeyken paketleri yükle: `npm install`
- klasör içindeyken çalıştır: `npm run start`

### Bilgiler
- Dokümana yeni bir şey eklemek istersen [markdown kullanım kılavuzunu](https://guides.github.com/features/mastering-markdown/) kullanabilirsin. 
- `gulp css` veya `gulp clear` gibi tasklar çalışmazsa `%appdata%\npm` içerisindeki `gulp.ps1` dosyasını sil.
* node.js versiyon yükseltince proje çalışmazsa
    * package.json devDependencies paketlerini son versiyonlara göre ayarla, versiyona boş string atarsan olur `""`    
    * `gulp-sass` artık `node-sass` paketini kullanmadığı için [package.json'a sass paketini manuel ekleyip gulpfile.js üzerinde çağırman gerekiyor.](https://www.npmjs.com/package/gulp-sass#migrating-to-version-5)
        * [`.scss` dosyalarında bölme `(/)` işareti kullanılmışsa `1.33` öncesi sass paketini kurmak gerekiyor. (since 1.33.0)](https://sass-lang.com/documentation/breaking-changes/slash-div) Yeni versiyona geçirilmeyecek durumdaysa [package.json `sass` versiyonu `1.32.*` yap](https://github.com/twbs/bootstrap/issues/34051#issuecomment-845838276)
- Kaynaklar
    - [Repo hakkında genel anlatım video kaydı 1:14:46](https://projeyazilim-my.sharepoint.com/:v:/g/personal/kerim_karsavran_proj-e_com/EWPzYzQG5g5IvwxGDeFo_1UB2jezW-9_fNkPFMFJ6rKOLg?e=Q0aEHK)

# Korayspor Theme
Light ve dark temalar eklendi
if pageClass === "dark-theme"
// css
link(rel="stylesheet", href=dirFrontend + "css/app-shell-dark-theme.css")
link(rel="stylesheet", href=dirFrontend + "css/style-dark-theme.css")
else 
// css
link(rel="stylesheet", href=dirFrontend + "css/app-shell.css")
link(rel="stylesheet", href=dirFrontend + "css/style.css")
