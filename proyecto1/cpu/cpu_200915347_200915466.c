#include <linux/fs.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/seq_file.h>
#include <linux/proc_fs.h>
#include <linux/module.h>


MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Escribir información de los procesos que estan corriendo actualmente.");
MODULE_AUTHOR("Fernando Reyes -  200915347");

static int escribir_archivo(struct seq_file * archivo, void *v) {
	struct task_struct *task;
    struct task_struct *task_child;
    struct list_head *list;

    seq_printf(archivo, "===============================================\n");
    seq_printf(archivo, "|  Laboratorio Sistemas Operativos 1          |\n");
    seq_printf(archivo, "|  Vacaciones junio 2020                      |\n");
    seq_printf(archivo, "|  Fernando Reyes  -  200915347               |\n");
    seq_printf(archivo, "|  Oliver Rodas    -  200915466               |\n");
    seq_printf(archivo, "|                                             |\n");
    seq_printf(archivo, "|         PROYECTO 1 (MODULO 2 - CPU)         |\n");
    seq_printf(archivo, "|                                             |\n");
    seq_printf(archivo, "===============================================\n");
    seq_printf(archivo, "                                               \n");

    for_each_process(task){
        seq_printf(archivo, "-----------------------------------------------\n");
		seq_printf(archivo, "  PID:    \t %d \n", task->pid);
		seq_printf(archivo, "  Nombre: \t %s \n", task->comm);
		seq_printf(archivo, "  Estado: \t ");
        switch(task->state){
			case 0:
				seq_printf(archivo, "Ejecutando\n");
				break;
			case 1:
				seq_printf(archivo, "Listo\n");
				break;
			case 2:
				seq_printf(archivo, "Durmiendo\n");
				break;
			case 4:
				seq_printf(archivo, "Zombie\n");
				break;
			case 8:
				seq_printf(archivo, "Detenido\n");
				break;
			case 32:
				seq_printf(archivo, "En Espera\n");
				break;
            default:
                seq_printf(archivo, "Desconocido\n");
				break;
		}

        seq_printf(archivo, "  Hijos: \n");

        list_for_each(list, &task->children) {
            task_child=list_entry(list, struct task_struct, sibling);
            seq_printf(archivo, "        ---------------------------------------\n");
            seq_printf(archivo, "        PID:    \t %d \n", task_child->pid);
		    seq_printf(archivo, "        Nombre: \t %s \n", task_child->comm);
            seq_printf(archivo, "        Estado: \t ");
            switch(task_child->state){
                case 0:
                    seq_printf(archivo, "Ejecutando\n");
                    break;
                case 1:
                    seq_printf(archivo, "Listo\n");
                    break;
                case 2:
                    seq_printf(archivo, "Durmiendo\n");
                    break;
                case 4:
                    seq_printf(archivo, "Zombie\n");
                    break;
                case 8:
                    seq_printf(archivo, "Detenido\n");
                    break;
                case 32:
                    seq_printf(archivo, "En Espera\n");
                    break;
                default:
                    seq_printf(archivo, "Desconocido\n");
                    break;
            }

        }

    }

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
    proc_create("cpu_200915347_200915466", 0, NULL, &operaciones);
    printk(KERN_INFO "Carné: 200915347_200915466\n");
    return 0;
}
 
static void salir(void)
{
    remove_proc_entry("cpu_200915347_200915466", NULL);
    printk(KERN_INFO "Curso: Sistemas Operativos 1\n");
}
 
module_init(iniciar);
module_exit(salir); 