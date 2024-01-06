import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from '@app/_models';
import { AlertService, BooksService } from '@app/_services';
// import Swal from 'sweetalert2';



// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
declare var $: any; // jQuery

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit, OnDestroy {

  // Datatables
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Variables
  currentRoute: string;
  booksArray: Books[] = [];


  // Otras
  errorMessage = '';
  loading = false;


  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    // Validaciones de la ruta
    router.events.subscribe(() => {
      // this.currentRoute = this.router.url;
      this.currentRoute = this.router.url.split('/')[1];
    });
  }

  ngOnInit(): void {

    // Init de Materialize components
    $(document).ready(function () {
      $('.parallax').parallax();
      // $('#htmlTablaLibros').DataTable();
    });

    //#region  Configuraciones tabla

    var langDatatable = {
      "decimal": "",
      "emptyTable": "No hay datos disponibles en la tabla",
      "info": "Mostrando _START_ de _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 de 0 de 0 registros",
      "infoFiltered": "(filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Criterio de búsqueda",
      "zeroRecords": "No se encontrarón registros que coincidan con la búsqueda",
      "paginate": {
        "first": "Pri.",
        "last": "Últ.",
        "next": "Sig.",
        "previous": "Ant."
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    }

    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5,
      dom: 'lfrtip',
      language: langDatatable,
      columnDefs: [{
        targets: [0, 1],
        // visible: false,
        searchable: true
      }],
      drawCallback: function () {
        $("input[type='search']").attr("id", "searchBox");
        $('#searchBox').css("border", "none").css("border-radius", "0px").css("border-bottom", "1px solid #F2EFBB");
      }
    };

    //#endregion

    // Ejecutamos funciones de inicio
    this.fnObtieneLibros();

  }

  //#region INTERACCION CON LA DB

  // Funcion para obtener el listado de libros
  private fnObtieneLibros() {
    this.booksService.getBooks()
      .pipe(first())
      .subscribe(books => {
        this.booksArray = books;
        console.log(this.booksArray);

        // Pintado de la tabla
        this.dtTrigger.next();
      });
  }

  private getFile(id: number, tipo: number) {
    this.booksService.getBookFile(id, tipo)
      .pipe(first())
      .subscribe({
        next: file => {
          // Tipos:
          // 1 -> Kindle, 2 -> PDF, 3-> EPUB
          switch (tipo) {
            case 1:
              var fileName = `${this.booksArray.filter(book => book.BookID === file.BookID)[0].title}.azw3`.replace(/\s/g, "");
              break;
            case 2:
              var fileName = `${this.booksArray.filter(book => book.BookID === file.BookID)[0].title}.pdf`.replace(/\s/g, "");
              break;
            case 3:
              var fileName = `${this.booksArray.filter(book => book.BookID === file.BookID)[0].title}.epub`.replace(/\s/g, "");
              break;
          }

          this.forgeFile(file.file, fileName, tipo)

        },
        error: error => {
          this.alertService.toastError(error);
          this.errorMessage = error;
          this.loading = false;
        }
      })
  }

  //#endregion

  //#region FUNCIONES PARA LA DESCARGA DE DOCUMENTOS


  // Funcion para consumir la función privada
  fnDownloadFile(BookID: number, tipo: number) {
    // Tipos:
    // 1 -> Kindle, 2 -> PDF, 3 -> EPUB
    this.getFile(BookID, tipo)
  }

  dataURLtoFile(file: string, filename: string, mime: string) {
    var bstr = atob(file),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  forgeFile(file: string, name: string, tipo: number) {

    // Tipos:
    // 1 -> Kindle, 2 -> PDF, 3 -> EPUB
    switch (tipo) {
      case 1:
        var appType = 'application/vnd.amazon.ebook';
        break;
      case 2:
        var appType = 'application/pdf';
        break;
      case 3:
        var appType = 'application/epub+zip';
        break;
    }

    var archivo = this.dataURLtoFile(file, name, appType);

    if (archivo) {
      let dataType = appType;
      let binaryData = [];
      binaryData.push(archivo);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      if (archivo.name) downloadLink.setAttribute('download', archivo.name);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }

  }

  //#endregion

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
