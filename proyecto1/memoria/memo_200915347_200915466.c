#include <linux/proc_fs.h>
#include <linux/seq_file.h> 
#include <linux/hugetlb.h>
#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>   
#include <linux/fs.h>

#define BUFSIZE  	150

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Escribir información de la memoria RAM.");
MODULE_AUTHOR("Fernando Reyes -  200915347");

struct sysinfo inf;

static int escribir_archivo(struct seq_file * archivo, void *v) {	
    si_meminfo(&inf);
    
    seq_printf(archivo, "===============================================\n");
    seq_printf(archivo, "|  Laboratorio Sistemas Operativos 1          |\n");
    seq_printf(archivo, "|  Vacaciones junio 2020                      |\n");
    seq_printf(archivo, "|  Fernando Reyes  -  200915347               |\n");
    seq_printf(archivo, "|  Oliver Rodas    -  200915466               |\n");
    seq_printf(archivo, "|                                             |\n");
    seq_printf(archivo, "|     PROYECTO 1 (MODULO 1 - MEMORIA RAM)     |\n");
    seq_printf(archivo, "|                                             |\n");
    seq_printf(archivo, "===============================================\n");
	seq_printf(archivo, "  Sistema Operativo: Ubuntu 18.04\n");
	seq_printf(archivo, "  Memoria Total:  \t %8lu MB\n", (inf.totalram * 4) / 1024);
	seq_printf(archivo, "  Memoria Libre:  \t %8lu MB\n", (inf.freeram * 4) / 1024 );
	seq_printf(archivo, "  Memoria en uso: \t %8li %%\n", 100 - ((inf.freeram * 4 * 100) / (inf.totalram * 4)));

    return 0;
}

static int al_abrir(struct inode *inode, struct  file *file) {
  return single_open(file, escribir_archivo, NULL);
}

static struct file_operations operaciones =
{    
    .open = al_abrir,
    .read = seq_read
};

static int iniciar(void)
{
    proc_create("memo_200915347_200915466", 0, NULL, &operaciones);
    printk(KERN_INFO "Carné: 200915347_200915466\n");
    return 0;
}
 
static void salir(void)
{
    remove_proc_entry("memo_200915347_200915466", NULL);
    printk(KERN_INFO "Curso: Sistemas Operativos 1\n");
}
 
module_init(iniciar);
module_exit(salir); 
